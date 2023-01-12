/**
 * Base response interface
 */
interface IBaseResponse {
  error: boolean;
  status: number;
  message: string;
  path?: string;
  timestamp: Date | string;
}

/**
 * Success response interface
 */
export interface ISuccessResponse<T> extends IBaseResponse {
  data: T;
}

/**
 * Error response interface
 */
export interface IErrorResponse<T> extends IBaseResponse {
  trace: T;
}
