import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { RpcException } from '@nestjs/microservices';
  
  @Catch(RpcException)
  export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const error = exception.getError() as
        | string
        | { statusCode?: number; message?: string };
  
      const statusCode =
        typeof error === 'object' && error.statusCode
          ? error.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        typeof error === 'object' && error.message
          ? error.message
          : 'Internal server error';
  
      response.status(statusCode).json({
        statusCode,
        message,
      });
    }
  }