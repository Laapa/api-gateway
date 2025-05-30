import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { orderClient } from '@app/clients/rpc-clients';
import { CreateOrderDto } from '@orders/order.dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  @Post()
  async createOrder(@Body() data: CreateOrderDto) {
    return firstValueFrom(orderClient.send({ cmd: 'createOrder' }, data));
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return firstValueFrom(orderClient.send({ cmd: 'getOrderById' }, id));
  }
}