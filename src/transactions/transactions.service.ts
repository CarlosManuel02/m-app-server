import {Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {Repository} from "typeorm";
import {AuthService} from "../auth/auth.service";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly authService: AuthService,
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

    findAll(pagination: PaginationDto) {
        return `This action returns all transactions`;
    }

    findOne(id: string) {
        return `This action returns a #${id} transaction`;
    }

    update(id: string, updateTransactionDto: UpdateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }

    remove(id: string) {
        return `This action removes a #${id} transaction`;
    }
}
