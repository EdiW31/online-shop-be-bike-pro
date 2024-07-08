import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateFavoriteDto {
    @IsNumber()
    @IsNotEmpty()
    productId: number;
}
