import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {Auth} from "./entities/auth.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '3600'
            },
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([Auth])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
