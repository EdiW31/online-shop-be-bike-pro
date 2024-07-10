import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/Guards/role.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class ProductsModule {}
