import {Module} from '@nestjs/common';
import {TransactionsService} from './transactions.service';
import {TransactionsController} from './transactions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        AuthModule
    ],
    controllers: [TransactionsController],
    providers: [
        TransactionsService,
        AuthService,
        JwtService
    ]
})
export class TransactionsModule {
}
