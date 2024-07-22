import { Controller,UseGuards, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/productDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //creare produs
  @Post('create')
  create(@Body() createProductDto: ProductDto) {
    return this.productsService.create(createProductDto);
  }

  //afisare toate produsele
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  //afisare produs dupa id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
 
  @Get('/categorie/:category')
  findByCategory(@Param('category', ParseIntPipe) category: number) {
    return this.productsService.findByCategory(category);
  }

  //update produs
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.productsService.update(+id,updateProductDto);
  }

  //stergere produs
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
