import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsOptional()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;
}


