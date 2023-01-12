import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

/**
 * Validation options
 */
export const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.property]: Object.values(
              currentValue.constraints,
            ).join(', '),
          }),
          {},
        ),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};
