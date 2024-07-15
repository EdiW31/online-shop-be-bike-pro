import { Controller, Post, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from '../products/products.service'; 


@Controller('upload')
export class UploadController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body('productId') productId: number) {
    const photoUrls = files.map(file => file.path);
  
    await this.productsService.addProductPhotos(productId, photoUrls);
  
    return {
      message: 'Files uploaded successfully',
      photoUrls,
    };
  }
}
