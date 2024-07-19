import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDto } from './dto/productDto';
import { parse } from 'path';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}

  async addProductPhotos(productId: string, photoUrls: string) {
    console.log("productId", productId)
    const numericProductId = parseInt(productId,10);
    const product = await this.prisma.product.findUnique({where: {id: numericProductId}});
    if (!product) {
      throw new Error('Product not found');
    }
    await this.prisma.product.update({
      where: {id: numericProductId},
      data: {
        photos: {
          create: [{photoUrl: photoUrls}], // Adjusted to use photoUrls directly as a single object
        },
      },
    });
  }

  create(createProductDto: ProductDto ) {
    return this.prisma.product.create({data: createProductDto});
  }

  findAll() {
    return this.prisma.product.findMany(
      {include:{reviews:true, photos:true, category:true}}
    );
  }
  
  findOne(id: number) {
    return this.prisma.product.findUnique({where: {id: id}});
  }

  update(id: number, updateProductDto: ProductDto) {
    return this.prisma.product.update({where: {id: id}, data: updateProductDto});
  }

  remove(id: number) {
    return this.prisma.product.delete({where: {id: id}});
  } 
}
