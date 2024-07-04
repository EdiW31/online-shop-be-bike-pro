import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, ProductsModule],
  providers: [],
})
export class AppModule {}
