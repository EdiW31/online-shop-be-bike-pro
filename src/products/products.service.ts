import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductDto } from './dto/productDto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService){}

  create(createProductDto: ProductDto ) {
    return this.prisma.product.create({data: createProductDto});
  }

  findAll() {
    return this.prisma.product.findMany();
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
