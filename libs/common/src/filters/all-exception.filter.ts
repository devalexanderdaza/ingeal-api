import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ErrorResponse } from '../dtos';

/**
 * This filter is used to catch all exceptions and return a standard response
 */
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: ErrorResponse<unknown> =
      new ErrorResponse<unknown>();

    exceptionResponse.error = true;
    exceptionResponse.status = status;
    exceptionResponse.message = exception.toString();
    exceptionResponse.path = request.url;
    exceptionResponse.timestamp = new Date().toISOString();
    exceptionResponse.trace = exception;

    this.logger.error(`Exception catched in ${request.url}`);
    this.logger.error(
      `Exception: ${exceptionResponse.message}`,
      exceptionResponse.trace,
      AllExceptionsFilter.name,
    );

    response.status(exceptionResponse.status).json(exceptionResponse);
  }
}
