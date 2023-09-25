import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {AuthService} from "../auth.service";
import {JwtPayload} from "../../common/interfaces/jwt.interface";

require('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = await this.authService.findBy(username)
        if (!user) {
            console.log(payload)
            throw new UnauthorizedException();
        }
        return user;
    }
}