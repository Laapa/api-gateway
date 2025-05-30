import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from '@products/products.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: process.env.PRODUCT_QUEUE || 'product_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {} 