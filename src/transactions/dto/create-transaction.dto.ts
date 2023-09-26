import {IsDate, IsIn, IsInt, IsOptional, IsPositive, IsString} from "class-validator";

export class CreateTransactionDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsIn(['income', 'expense'])
    type: string;

    @IsString()
    from: string;

    @IsInt()
    amount: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsDate()
    date: Date;

    @IsInt()
    @IsPositive()
    categoryId: number;
}
