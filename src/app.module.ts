import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {User} from "./auth/entities/user.entity";



@Module({
  imports: [
      AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [User],
      synchronize: false,
      options: { encrypt: false },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
