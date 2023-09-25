import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("new")
    Register(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Post()
    Login(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.login(createAuthDto);
    }

    @Get("/all")
    findAll(@Query() pagination: PaginationDto) {
        return this.authService.findAll(pagination);
    }

    @Get('/:term')
    findOne(@Param('term') term: string) {
        return this.authService.findBy(term);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.update(id, updateAuthDto);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.authService.remove(id);
    }

}
