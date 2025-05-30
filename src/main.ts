import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RpcExceptionFilter } from '@common/filters/rpc-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new RpcExceptionFilter());
  
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(3000);
  console.log('🚀 API Gateway is running on http://localhost:3000');
}
bootstrap();