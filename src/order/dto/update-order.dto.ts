import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    productId: number;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
