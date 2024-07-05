import {IsString, IsNumber, IsOptional, IsNotEmpty} from 'class-validator';

export class ProductDto{
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    price: number;
}