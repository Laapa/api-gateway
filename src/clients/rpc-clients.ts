import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const userClient: ClientProxy = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    queue: 'user_queue',
    queueOptions: {
      durable: false,
    },
  },
});

export const productClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    queue: 'product_queue',
    queueOptions: { durable: false },
  },
});

export const orderClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    queue: 'order_queue',
    queueOptions: { durable: false },
  },
});