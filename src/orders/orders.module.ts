import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from '@orders/orders.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: process.env.ORDER_QUEUE || 'order_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {} 