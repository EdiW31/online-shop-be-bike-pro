import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateFavoriteDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    productId: number;
}
