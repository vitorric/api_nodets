// src/__tests__/core/api-response.test.ts

import {
  ok,
  created,
  accepted,
  badRequest,
  unauthorized,
  unprocessableEntity,
  forbidden,
  notFound,
  conflict,
  tooMany,
  internalServerError,
} from '@core/api-response';

import { HttpStatusCode } from 'axios';

describe('API Response Helpers', () => {
  // === SUCESSO ===
  it('should return ok response with data', () => {
    const data = { message: 'success' };
    const res = ok(data);

    expect(res).toEqual({
      statusCode: HttpStatusCode.Ok,
      payload: data,
      success: true,
    });
  });

  it('should return ok response without data', () => {
    const res = ok();

    expect(res).toEqual({
      statusCode: HttpStatusCode.Ok,
      payload: undefined,
      success: true,
    });
  });

  it('should return created response', () => {
    const res = created({ id: 1 });

    expect(res).toEqual({
      statusCode: HttpStatusCode.Created,
      payload: { id: 1 },
      success: true,
    });
  });

  it('should return accepted response', () => {
    const res = accepted({ message: 'in progress' });

    expect(res).toEqual({
      statusCode: HttpStatusCode.Accepted,
      payload: { message: 'in progress' },
      success: true,
    });
  });

  // === ERRO ===
  it('should return badRequest response', () => {
    const res = badRequest('Invalid data');

    expect(res).toEqual({
      statusCode: HttpStatusCode.BadRequest,
      payload: { error: 'Invalid data' },
      success: false,
    });
  });

  it('should return unauthorized response', () => {
    const res = unauthorized('Token invalid');

    expect(res).toEqual({
      statusCode: HttpStatusCode.Unauthorized,
      payload: { error: 'Token invalid' },
      success: false,
    });
  });

  it('should return unprocessableEntity response', () => {
    const res = unprocessableEntity('Validation failed');

    expect(res).toEqual({
      statusCode: HttpStatusCode.UnprocessableEntity,
      payload: { error: 'Validation failed' },
      success: false,
    });
  });

  it('should return forbidden response', () => {
    const res = forbidden('Access denied');

    expect(res).toEqual({
      statusCode: HttpStatusCode.Forbidden,
      payload: { error: 'Access denied' },
      success: false,
    });
  });

  it('should return notFound response', () => {
    const res = notFound('Item not found');

    expect(res).toEqual({
      statusCode: HttpStatusCode.NotFound,
      payload: { error: 'Item not found' },
      success: false,
    });
  });

  it('should return conflict response', () => {
    const res = conflict('Already exists');

    expect(res).toEqual({
      statusCode: HttpStatusCode.Conflict,
      payload: { error: 'Already exists' },
      success: false,
    });
  });

  it('should return tooMany response', () => {
    const res = tooMany('Rate limit exceeded');

    expect(res).toEqual({
      statusCode: HttpStatusCode.TooManyRequests,
      payload: { error: 'Rate limit exceeded' },
      success: false,
    });
  });

  it('should return internalServerError with custom message', () => {
    const res = internalServerError('Something exploded');

    expect(res).toEqual({
      statusCode: HttpStatusCode.InternalServerError,
      payload: { error: 'Something exploded' },
      success: false,
    });
  });

  it('should return internalServerError with default message', () => {
    const res = internalServerError();

    expect(res).toEqual({
      statusCode: HttpStatusCode.InternalServerError,
      payload: { error: 'Erro interno do servidor' },
      success: false,
    });
  });
});
