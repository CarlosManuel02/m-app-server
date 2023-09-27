import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {User} from "./entities";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {v4 as uuidv4, validate as isUUID} from 'uuid';
import * as bcrypt from 'bcrypt';
import {PaginationDto} from "../common/dtos/pagination.dto";
import {JwtService} from "@nestjs/jwt";
import {CreateAccountDto} from "./dto/create-account.dto";
import {Account} from "./entities";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly datasource: DataSource,
        private readonly jwtService: JwtService,
    ) {
    }

    async create(createAuthDto: CreateAuthDto) {
        createAuthDto.id = uuidv4();

        createAuthDto.role = 'user';

        const user = await this.authRepository.findOneBy({email: createAuthDto.email});
        if (user) {
            return {
                message: 'El usuario ya existe'
            }
        }

        createAuthDto.salt = await bcrypt.genSalt(10);
        createAuthDto.password = await bcrypt.hash(createAuthDto.password, createAuthDto.salt);

        // TODO: Generar token JWT
        const token = await this.generateJWT(createAuthDto);

        const auth = this.authRepository.create(createAuthDto);
        await this.authRepository.save(auth);
        return {
            ...auth,
            token
        }
    }

    findAll(Pagination: PaginationDto) {
        const {limit = 10, offset = 0} = Pagination;

        return this.authRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async findBy(term: string) {
        let user: User;
        if (isUUID(term)) {
            user = await this.authRepository.findOneBy({id: term})
        } else {
            const queryBuilder = this.authRepository.createQueryBuilder('user');
            user = await queryBuilder
                .where('email = :email OR username = :username', {
                    email: term,
                    username: term
                }).getOne()
        }
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        return user;
    }

    async update(id: string, updateAuthDto: UpdateAuthDto) {

        const user = await this.authRepository.preload({
            id: id,
            ...updateAuthDto
        });

        if (!user) throw new NotFoundException('Usuario no encontrado');

        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        await queryRunner.manager.save(user);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return user;
    }

    async remove(id: string) {
        const auth = await this.findBy(id)

        if (!auth) {
            return {
                message: 'Usuario no encontrado'
            }
        }
        try {
            const result = await this.authRepository.delete(id);
            return {
                message: 'Usuario eliminado correctamente',
                result
            }
        } catch (e) {
            return {
                message: 'Error al eliminar el usuario',
                e
            }
        }
    }

    async login(createAuthDto: CreateAuthDto) {
        const {id, username, email, password} = createAuthDto;
        const user = await this.findBy(email)

        if (user && await user.validatePassword(password)) {

            const token = await this.generateJWT(user);

            return {
                token
            }

        } else {
            return {
                message: 'Usuario o contraseña incorrectos'
            }
        }


    }

    async generateJWT(createAuthDto: CreateAuthDto | User) {
        const payload = {
            username: createAuthDto.username,
            email: createAuthDto.email,
            role: createAuthDto.role
        }
        return await this.jwtService.sign(payload);
    }

    async addAccount(createAccountDto: CreateAccountDto) {
        const user = await this.findBy(createAccountDto.userId);
        if (!user) throw new NotFoundException('Usuario no encontrado');
        console.log(createAccountDto)

        try {
            createAccountDto.id = uuidv4();
            const account = this.accountRepository.create(createAccountDto);
            await this.accountRepository.save(account);
            return {
                account,
                message: 'Cuenta agregada correctamente'
            }

        } catch (e) {
            return {
                message: 'Error al agregar la cuenta',
                e
            }
        }

    }

    async getBalance(accountId: string) {
        const account = await this.accountRepository.findOneBy({id: accountId});
        if (!account) throw new NotFoundException('Cuenta no encontrada');

        return {
            balance: account.balance
        }

    }

    async findAccountById(userId: string, accountId: string) {
        const user = await this.findBy(userId);
        if (!user) throw new NotFoundException('Usuario no encontrado');

        const account = await this.accountRepository.findOneBy({id: accountId});
        if (!account) throw new NotFoundException('Cuenta no encontrada');

        return account;
    }

    async updateAccount(account: Account) {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        await queryRunner.manager.save(account);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return account;
    }
}
