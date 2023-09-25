import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '3h',
            },
        }),
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {
}
