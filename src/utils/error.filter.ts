import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusParm = 500;
    const errorParm: string = 'Internal Server Error';
    const messageParm: string = exception.message;

    response
      .status(statusParm)
      .json({
        errors: [
          {
            status: statusParm,
            timestamp: new Date().toISOString(),
            error: errorParm,
            message: messageParm,
            links: {
              path: request.url,
            },
          },
        ],
      });
  }
}
