import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { userClient } from '@app/clients/rpc-clients';
import { CreateUserDto } from '@users/user.dto';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return firstValueFrom(userClient.send({ cmd: 'createUser' }, data));
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return firstValueFrom(userClient.send({ cmd: 'getUserById' }, id));
  }
}