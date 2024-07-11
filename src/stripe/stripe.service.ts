import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Order } from '@prisma/client';

@Injectable()
export class StripeService {
    private stripe;
    constructor(){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20',
        });
    }

    async checkout(order: Order | Order[]): Promise<Order | Order[]> {
        console.log(order);
        if (!order) {
            throw new Error('Order object is undefined.');
        }
        // Adjusting for the case where order might be an array
        const singleOrder = Array.isArray(order) ? order[0] : order;
        const totalPrice: number = singleOrder.totalPrice;
        console.log('Order status before payment:', singleOrder.status);
        console.log('Total price:', totalPrice);
    
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: totalPrice * 100, // Assuming totalPrice is in dollars and needs to be converted to cents
                currency: 'usd',
                payment_method_types: ['card'],
            });
    
            // Assuming paymentIntent confirms the payment was successful
            // Update the order status to "DONE"
            singleOrder.status = 'DONE';
            console.log('Order status after payment:', singleOrder.status);
    
            // Here you would typically save the updated order status to your database
            // For example: await this.orderService.updateOrder(singleOrder.id, { status: 'DONE' });
    
            return singleOrder; // Return the updated order daca este succsesful
        } catch (error) {
            console.error('Payment failed:', error);
            throw new Error('Payment processing failed.');
        }
    }
}


