import {IsIn, IsInt, IsOptional, IsPositive, IsString} from "class-validator";

let currencys = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL", "MXN", "SGD"];

export class CreateCategoryDto {

    @IsString()
    @IsOptional()
    id: string;

    @IsString()

    name: string;

    @IsString()
    @IsIn([...currencys])
    currency: string;

    @IsString()
    @IsOptional()
    icon: string;
}
