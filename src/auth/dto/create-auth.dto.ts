import {IsArray, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength} from "class-validator";

export class CreateAuthDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsIn(['admin', 'user'])
    @IsOptional()
    role: string;

    @IsString()
    @IsOptional()
    salt: string;

}


