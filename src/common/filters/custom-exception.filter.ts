import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseError } from '../interfaces/error.interface';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: ResponseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message,
        error: error.name,
      });
    } else {
      console.log('here[x]');
      const status = error?.statusCode || 500;
      response.status(status).json({
        statusCode: status,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  }
}
