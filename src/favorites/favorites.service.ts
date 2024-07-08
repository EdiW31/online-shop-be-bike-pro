import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(createFavoriteDto: CreateFavoriteDto, user: any) {
    const { productId } = createFavoriteDto;
    const userId = user.userId; // folosim userId-ul din obiectul user
    console.log("userId", userId);
  
    // verificam daca produsul exista
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    // verificam daca favorite-ul exista deja
    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        productId: productId,
        userId: userId // Link the favorite to the user
      }
    });
  
    if (existingFavorite) {
      throw new Error('Favorite already exists');
    }
  
    // creaza favorite-ul
    return this.prisma.favorite.create({
      data: {
        productId: productId,
        userId: userId // link uieste favorite-ul la user
      }
    });
  }

  showAllFavorite(user: any) {
    const userId = user.userId; // folosim userId-ul din obiectul user
    console.log("userId", userId);
    return this.prisma.favorite.findMany({
      where: {
        userId: userId,
      },
    });
  }

  removeFavorite(id: number) {
    return this.prisma.favorite.delete({
      where: {
        id: id  
      }
    });
  }
}
