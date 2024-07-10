import { IsString, IsNumber, IsOptional, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @Min(1)
    @Max(5)
    @IsNumber()
    rating: number;

    @IsString()
    @IsOptional()
    text: string;
}
