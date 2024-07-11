import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService) {}

    @Post('checkout')
    checkout(@Body() body:{order:any}){
        try{
            return this.stripeService.checkout(body.order);
        }catch(e){
            console.log(e);
        }
    }
}
