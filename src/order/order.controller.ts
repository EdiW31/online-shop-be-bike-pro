import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';


@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Request() req:any) {
    console.log(req.user)
    return this.orderService.create(createOrderDto, req.user, req.product);
  }

  // @Roles('ADMIN')
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  
  @Get(':userId')
  // @Roles('ADMIN')
  findOne(@Param('userID') userId: string) {
    return this.orderService.findOne(userId);
  }

  @Patch(':id')
  // @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  // @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
