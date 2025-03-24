import { authFactory } from '@application/factory/auth.factory';
import { validateSchema } from '@shared/validator-schema';
import { unauthorized, ok } from '@core/api-response';
import { error, success } from '@core/either';
import { ErrorMessages } from '@shared/error-messages';
import { Request } from 'express';
import { AuthLoginReq } from '@domain/request/auth/auth-request-service';
import { authController } from '@application/controller/auth.controller';

jest.mock('@application/factory/auth.factory', () => {
  return {
    authFactory: {
      login: jest.fn(),
      me: jest.fn(),
    },
  };
});

jest.mock('@shared/validator-schema');

const mockedValidateSchema = validateSchema as jest.MockedFunction<
  typeof validateSchema
>;
const mockedAuthFactory = authFactory as jest.Mocked<typeof authFactory>;

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginReq = { email: 'a@a.com', password: '123' };
    const jwtRes = { jwt: 'token-123' };

    it('should return unauthorized if validation fails', async () => {
      mockedValidateSchema.mockReturnValue(
        error(unauthorized('invalid request')),
      );

      const req = { body: {} } as Request;
      const res = await authController.login(req);

      expect(res).toEqual(unauthorized('invalid request'));
    });

    it('should return error from authFactory if login fails', async () => {
      const mockReq: AuthLoginReq = loginReq;

      mockedValidateSchema.mockReturnValue(success(mockReq));

      mockedAuthFactory.login.mockResolvedValueOnce(
        error(unauthorized(ErrorMessages.AUTH.INVALID_CREDENTIALS)),
      );

      const req = { body: {} } as Request;
      const res = await authController.login(req);

      expect(res).toEqual(unauthorized(ErrorMessages.AUTH.INVALID_CREDENTIALS));
    });

    it('should return ok if login is successful', async () => {
      const mockReq: AuthLoginReq = loginReq;

      mockedValidateSchema.mockReturnValue(success(mockReq));

      mockedAuthFactory.login.mockResolvedValueOnce(success(jwtRes));

      const req = { body: {} } as Request;
      const res = await authController.login(req);

      expect(res).toEqual(ok(jwtRes));
    });
  });

  describe('me', () => {
    it('should return unauthorized if validation fails', async () => {
      mockedValidateSchema.mockReturnValue(
        error(unauthorized(ErrorMessages.AUTH.TOKEN_EXPIRED)),
      );

      const req = { user: {} } as Request;
      const res = await authController.me(req);

      expect(res).toEqual(unauthorized(ErrorMessages.AUTH.TOKEN_EXPIRED));
    });

    it('should return error from authFactory if me fails', async () => {
      mockedValidateSchema.mockReturnValue(success({ _id: 'user-id-123' }));

      mockedAuthFactory.me.mockResolvedValueOnce(
        error(unauthorized('some error')),
      );

      const req = { user: {} } as Request;
      const res = await authController.me(req);

      expect(res).toEqual(unauthorized('some error'));
    });

    it('should return ok if user is valid', async () => {
      mockedValidateSchema.mockReturnValue(success({ _id: 'user-id-123' }));

      mockedAuthFactory.me.mockResolvedValueOnce(success({ name: 'John Doe' }));

      const req = { user: {} } as Request;
      const res = await authController.me(req);

      expect(res).toEqual(ok({ name: 'John Doe' }));
    });
  });
});
