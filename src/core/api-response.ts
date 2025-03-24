import { HttpStatusCode } from 'axios';

export type ApiResponse<T = any> = {
  statusCode: number;
  payload: T;
  success: boolean;
};

export type ApiResponseError = ApiResponse<{ error: string }>;

// === Sucesso ===
export function ok<T>(dto?: T): ApiResponse<T | undefined> {
  return {
    statusCode: HttpStatusCode.Ok,
    payload: dto,
    success: true,
  };
}

export function created<T>(dto?: T): ApiResponse<T | undefined> {
  return {
    statusCode: HttpStatusCode.Created,
    payload: dto,
    success: true,
  };
}

export function accepted<T>(dto?: T): ApiResponse<T | undefined> {
  return {
    statusCode: HttpStatusCode.Accepted,
    payload: dto,
    success: true,
  };
}

// === Erro ===
function errorResponse(statusCode: number, error: string): ApiResponseError {
  return {
    statusCode,
    payload: { error },
    success: false,
  };
}

export const badRequest = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.BadRequest, error);

export const unprocessableEntity = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.UnprocessableEntity, error);

export const unauthorized = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.Unauthorized, error);

export const forbidden = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.Forbidden, error);

export const notFound = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.NotFound, error);

export const conflict = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.Conflict, error);

export const tooMany = (error: string): ApiResponseError =>
  errorResponse(HttpStatusCode.TooManyRequests, error);

export const internalServerError = (
  error = 'Erro interno do servidor',
): ApiResponseError => errorResponse(HttpStatusCode.InternalServerError, error);
