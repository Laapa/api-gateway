import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from '@users/users.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [UsersController],
})
export class UsersModule {}