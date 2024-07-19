import { Controller, Post, UseInterceptors, UploadedFiles, Body, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from '../products/products.service'; 

@Controller('upload')
export class UploadController {
  constructor(private productsService: ProductsService) {}

  // @UseInterceptors(FilesInterceptor('photos', 20, {
  //   storage: diskStorage({
  //     destination: '../../uploads',
  //     filename: (req, file: any, cb) => { // Correctly type the `file` parameter
  //       const name = file.originalname.split('.')[0];
  //       const fileExtension = file.originalname.split('.')[1];
  //       const newFileName = name.split(' ').join('-') + '-' + Date.now() + '.' + fileExtension
        
  //       cb(null, newFileName); 
  //     },
  //   }),
  //   fileFilter: (req, file, cb) => {
  //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //       return cb(new Error('Only image files are allowed!'), false);
  //     }
  //     cb(null, true);
  //   }
  // }))
  // async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body('productId') productId: number) {
  //   // Check if files is defined and has length
  //   console.log(files)
  //   if (!files || files.length === 0) {
  //     return { message: 'No files uploaded.' };
  //   }
  
  //   const photoUrls = files.map(file => file.path);
  
  //   try {
  //     await this.productsService.addProductPhotos(productId, photoUrls);
  //     return {
  //       message: 'Files uploaded successfully',
  //       photoUrls,
  //     };
  //   } catch (error) {
  //     // Handle any errors, e.g., database errors
  //     return { message: 'Failed to upload files.', error: error.message };
  //   }
  // }
  @Post(":productId")
  @UseInterceptors(FileInterceptor('photos',  {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file: any, cb) => { // Correctly type the `file` parameter
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split(' ').join('-') + '-' + Date.now() + '.' + fileExtension
        
        cb(null, newFileName); 
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('productId') productId: string) {
    // Check if files is defined and has length
    console.log(productId)
    if (!file) {
      return { message: 'No files uploaded.' };
    }
  
    const photoUrl = file.path;
  
    try {
      await this.productsService.addProductPhotos(productId, photoUrl);
      return {
        message: 'File uploaded successfully',
        photoUrl,
      };
    } catch (error) {
      // Handle any errors, e.g., database errors
      return { message: 'Failed to upload file.', error: error.message };
    }
  }
}
