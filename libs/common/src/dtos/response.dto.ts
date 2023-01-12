import { IErrorResponse, ISuccessResponse } from '../interfaces';

/**
 * @description Base response class
 * @param T
 */
export class SuccessResponse<T> implements ISuccessResponse<T> {
  error: boolean;
  status: number;
  message: string;
  path?: string;
  timestamp: Date | string;
  data: T;
}

/**
 * @description Error response class
 * @param T
 */
export class ErrorResponse<T> implements IErrorResponse<T> {
  error: boolean;
  status: number;
  message: string;
  path?: string;
  timestamp: Date | string;
  trace: T;
}
