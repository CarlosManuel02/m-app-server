import {IsDate, IsIn, IsInt, IsOptional, IsPositive, IsString} from "class-validator";

export class CreateTransactionDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsIn(['income', 'expense'])
    type: string;

    @IsInt()
    amount: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    date: string;

    @IsString()
    categoryId: string;

    @IsString()
    accountId: string;

    @IsString()
    userId: string;

}
