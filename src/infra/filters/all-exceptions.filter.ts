import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CacheUnavailableError } from '@shared/errors/cache-unavailable.error';
import { SsoUnavailableError } from '@shared/errors/sso-unavailable.error';
import { Response } from 'express';

@Catch(Error, HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      exception instanceof CacheUnavailableError ||
      exception instanceof SsoUnavailableError
    ) {
      return response.status(HttpStatus.BAD_GATEWAY).json({
        statusCode: HttpStatus.BAD_GATEWAY,
        message: exception.message,
      });
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
