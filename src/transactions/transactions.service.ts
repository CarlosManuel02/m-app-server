import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {DataSource, Repository} from "typeorm";
import {AuthService} from "../auth/auth.service";
import {v4 as uuidv4} from 'uuid';
import {isUUID} from "class-validator";

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly authService: AuthService,
        private readonly datasource: DataSource,

    ) {
    }

    async create(createTransactionDto: CreateTransactionDto) {
        const {accountId, amount, userId, type} = createTransactionDto;
        createTransactionDto.id = uuidv4();
        console.log(createTransactionDto)
        if (type === 'expense') {
            // TODO: Check if the user has enough balance to make the transaction
            const account = await this.authService.findAccountById(userId, accountId);
            if (account.balance < amount) {
                return {
                    message: 'No tienes suficiente saldo para realizar esta transacción',
                    balance: account.balance
                }
            } else {
                account.balance -= amount;
                await this.authService.updateAccount(account);
                const transaction = this.transactionRepository.create(createTransactionDto);
                return await this.transactionRepository.save(transaction);
            }

        } else {
            const account = await this.authService.findAccountById(userId, accountId);
            account.balance = account.balance + amount;
            await this.authService.updateAccount(account);
            const transaction = this.transactionRepository.create(createTransactionDto);
            return await this.transactionRepository.save(transaction);
        }



    }

    async findAll(pagination: PaginationDto) {
        const {limit = 10, offset = 0} = pagination;

        return this.transactionRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) {
        let transaction: Transaction;

        if (isUUID(id)) {
            transaction = await this.transactionRepository.findOneBy({id: id});
        } else {
            const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');
            transaction = await queryBuilder.where('name LIKE :name', {
                name: `%${id}%`
            }).getOne();
        }
        if (!transaction) {
            throw new BadRequestException('Usuario no encontrado');
        }

        return transaction;
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto) {
        const transaction = await this.transactionRepository.preload({
            id: id,
            ...updateTransactionDto
        });
        if (!transaction) throw new BadRequestException('Transacción no encontrada');

        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        await queryRunner.manager.save(transaction);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return transaction;
    }

    async remove(id: string) {
        const transaction = await this.findOne(id);
        if (!transaction) throw new BadRequestException('Transacción no encontrada');
        return await this.transactionRepository.remove(transaction);
    }

    async getTransactionsByAccount(accountId: string) {
        const transactions = await this.transactionRepository.find({
            where: {
                accountId: accountId
            }
        })
        return transactions;
    }

    async getTransactionsByUser(userId: string) {
        const transactions = await this.transactionRepository.find({
            where: {
                userId: userId
            }
        })
        return transactions;
    }

}
