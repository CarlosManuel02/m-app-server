import {Injectable} from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt';
import {PaginationDto} from "../common/dtos/pagination.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly authRepository: Repository<User>,
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
        createAuthDto.jwt = '1234567890-1234567890-1234567890-1234567890';

        const auth = this.authRepository.create(createAuthDto);
        return await this.authRepository.save(auth);
    }

    findAll(Pagination: PaginationDto) {
        const {limit = 10, offset = 0} = Pagination;

        return this.authRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: number) {
        const auth = this.authRepository.findOneBy({id})
            .then((auth) => {
                if (!auth) {
                    return {message: 'Usuario no encontrado'}
                }
                return auth;
            }, (err) => {
                return {message: 'Error al buscar el usuario', err}
            });
        return await auth;
    }

    async update(id: number, updateAuthDto: UpdateAuthDto) {
        const auth = await this.authRepository.findOneBy({id})

        if (!auth) {
            return {
                message: 'Usuario no encontrado'
            }
        }
        try {
            const newAuth = await this.authRepository.update(id, updateAuthDto);
            return {
                message: 'Usuario actualizado correctamente',
                newAuth
            }
        } catch (e) {
            return {
                message: 'Error al actualizar el usuario',
                e
            }
        }
    }

    async remove(id: number) {
        const auth = await this.findOne(id)

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
        const user = await this.authRepository.findOneBy({email});

        if (user && await user.validatePassword(password)) {

            // TODO: Generar token JWT
            user.jwt = this.generateJWT();

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                jwt: user.jwt
            }

        } else {
            return {
                message: 'Usuario o contraseña incorrectos'
            }
        }


    }

    generateJWT() {
        return '1234567890-1234567890-1234567890-1234567890';
    }
}
