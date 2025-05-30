import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';
import * as dotenv from 'dotenv';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from '@users/users.controller';
import { OrdersController } from '@orders/orders.controller';
import { ProductsController } from '@products/products.controller';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string],
          queue: process.env.USER_QUEUE as string,
          queueOptions: { durable: false },
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string],
          queue: process.env.PRODUCT_QUEUE as string,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [UsersController, ProductsController, OrdersController ],
  providers: [],
})
export class AppModule {}