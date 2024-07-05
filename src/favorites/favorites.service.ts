import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  addFavorite(createFavoriteDto: CreateFavoriteDto) {
    const {userId, productId} = createFavoriteDto;

    //verificam daca exista produsul
    const product = this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if(!product){
      throw new Error('Product not found');
    }

    const user = this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if(!user){
      throw new Error('User not found');
    }

    const existingFavorite = this.prisma.favorite.findFirst({
      where: {
        userId: userId,
        productId: productId
      }
    });
    if(existingFavorite){
      throw new Error('Favorite already exists');
    }

    return this.prisma.favorite.create({
      data: {
        userId: userId,
        productId: productId
      }
    });
  }

  showAllFavorite() {
    return this.prisma.favorite.findMany();
  }

  removeFavorite(id: number) {
    return this.prisma.favorite.delete({
      where: {
        id: id  
      }
    });
  }
}
