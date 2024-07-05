import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [AuthModule, PrismaModule, UsersModule, ProductsModule, OrderModule, CategoryModule, FavoritesModule],
  providers: [],
})
export class AppModule {}
