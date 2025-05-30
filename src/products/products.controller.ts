import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { productClient } from '@app/clients/rpc-clients';
import { CreateProductDto } from '@products/product.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return firstValueFrom(productClient.send({ cmd: 'createProduct' }, data));
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return firstValueFrom(productClient.send({ cmd: 'getProductById' }, id));
  }
}