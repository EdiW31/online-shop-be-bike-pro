import {IsString, IsNumber, IsOptional} from 'class-validator';

export class ProductDto{
    @IsString()
    name: string;

    @IsString()
    category: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    price: number;
}