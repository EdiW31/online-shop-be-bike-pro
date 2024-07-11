import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config/dist/config.module'; // Import from the correct package

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
        }),
    ],
    controllers: [StripeController],
    providers: [StripeService]
})export class StripeModule {}
