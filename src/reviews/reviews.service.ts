import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(createReviewDto: CreateReviewDto, user: any) {
    const { productId, rating, text } = createReviewDto;
    return this.prisma.review.create({
      data: {
        rating,
        text,
        product: { connect: { id: productId } },
        user: { connect: { id: user.userId } },
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findAllMyReviews(user: any) {
    return this.prisma.review.findMany({
      where: { userId: user.userId },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
