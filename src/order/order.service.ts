import { Injectable, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from '.prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  //creaza
  async create(createOrderDto: CreateOrderDto, user: any, products: Product) {
    const { productId, quantity, totalPrice} = createOrderDto;
    const userId = user.userId; // folosim userId-ul din obiectul user
    // verifica daca produsul exista
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    // verifica daca userul exista
    const users = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!users) {
      throw new Error('User not found');
    }
  
    // verifica daca exista un order in statusul PENDING
    let order = await this.prisma.order.findFirst({
      where: {
        userId,
        status: 'PENDING',
      },
    });
  
    if (!order) {
      // Create a new order if none exists
      order = await this.prisma.order.create({
        data: {
          userId,
          status: 'PENDING',
          totalPrice // Initialize totalMoney with the price of the first product
        },
      });
    } else {
      // Update the totalMoney of the existing order
      await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          totalPrice: order.totalPrice + totalPrice,
        },
      });
    }
  
    // verifica daca exista un orderItem pentru produsul respectiv
    const existingOrderItem = await this.prisma.orderItem.findFirst({
      where: {
        orderId: order.id,
        productId: productId,
      },
    });
  
    if (existingOrderItem) {
      // updateaza cantitatea produsului
      return this.prisma.orderItem.update({
        where: { id: existingOrderItem.id },
        data: {
          quantity: existingOrderItem.quantity + quantity,
        },
      });
    }
  
    // adauga un nou orderItem
    return this.prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: productId,
        quantity: quantity,
      },
    });
  }
  // gaseste toate order-urile
  findAll() {
    return this.prisma.order.findMany();
  }
  // gaseste un order
  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id:id },
    })
  }
  // actualizeaza un order
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: updateOrderDto,
    });
  }
  // sterge un orde
  remove(id: number) {
    return this.prisma.order.delete({
      where: { id:id },
    })
  }
}
