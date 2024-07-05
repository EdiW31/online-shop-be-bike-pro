import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  //creare categorie
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    });
  }

  //afisam toate categoriile
  findAll() {
    return this.prisma.category.findMany();
  }

  //afisam produsele dintr-o anumita categorie
  getProductByCategory(categoryName: string) {
    const products = this.prisma.product.findMany({
      where: {
        category: {
          name: categoryName
        }
      },
      include: {
        category: true
      },
    });
    return products;
  }

  //update la categorie in caz ca vrem
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {id: id},
      data: updateCategoryDto
    });
  }

  //stergem categoria
  remove(id: number) {
    //delete category
    return this.prisma.category.delete({where:{id:id}});
  }
}
