import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {User} from "./auth/entities/user.entity";
import {CommonModule} from './common/common.module';
import {CategoriesModule} from './categories/categories.module';
import {TransactionsModule} from './transactions/transactions.module';


@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public')
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: false,
        }),
        CommonModule,
        CategoriesModule,
        TransactionsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
