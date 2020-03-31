import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionResponse } from './exception.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusParm = exception.getStatus();
    const message: ExceptionResponse = Object.assign(Object.create(ExceptionResponse.prototype), exception.getResponse());

    response
      .status(statusParm)
      .json({
        errors: [
          {
            status: statusParm,
            timestamp: new Date().toISOString(),
            error: message.error,
            message: message.message,
            links: {
              path: request.url,
            },
          },
        ],
      });
  }
}
