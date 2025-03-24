import { authFactory } from '@application/factory/auth.factory';
import { ApiResponse, ok, unauthorized } from '@core/api-response';
import {
  AuthLoginReq,
  AuthLoginSchema,
  AuthMeReq,
  AuthMeSchema,
} from '@domain/request/auth/auth-request-service';
import { ErrorMessages } from '@shared/error-messages';
import { ValidateSchema } from '@shared/validator-schema';
import { Request } from 'express';

class AuthController {
  async login(event: Request): Promise<ApiResponse> {
    const validationReq = ValidateSchema<AuthLoginReq>(
      AuthLoginSchema,
      event.body,
    );

    if (validationReq.isError()) {
      return validationReq.value;
    }

    const reqData: AuthLoginReq = validationReq.value;

    const result = await authFactory.login(reqData);

    if (result.isError()) {
      return result.value;
    }

    return ok(result.value);
  }

  async me(event: Request): Promise<ApiResponse> {
    const validationReq = ValidateSchema<AuthMeReq>(AuthMeSchema, event.user);

    if (validationReq.isError()) {
      return unauthorized(ErrorMessages.AUTH.TOKEN_EXPIRED);
    }

    const reqData: AuthMeReq = validationReq.value;

    const result = await authFactory.me(reqData);

    if (result.isError()) {
      return result.value;
    }

    return ok(result.value);
  }
}
const authController = new AuthController();

export { authController };
