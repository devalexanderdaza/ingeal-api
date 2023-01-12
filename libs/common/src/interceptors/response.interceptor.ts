import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';

import { SuccessResponse } from '../dtos';

/**
 * This interceptor is used to catch all responses and return a standard response
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const message = response.statusMessage;

    return next.handle().pipe(
      map((data) => ({
        error: false,
        status: response.statusCode,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
        data,
      })),
    );
  }
}
