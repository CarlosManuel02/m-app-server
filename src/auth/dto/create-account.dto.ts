import {IsInt, IsOptional, IsPositive, IsString, IsUUID, MinLength} from "class-validator";

export class CreateAccountDto {

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsPositive()
    balance: number;

    @IsString()
    @IsUUID()
    userId: string;
}