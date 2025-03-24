import { IJWTProvider } from 'src/interfaces/providers/jwt-provider.interface';
import { IUserRepository } from 'src/interfaces/repository/user-repository.interface';
import {
  AuthLoginRes,
  AuthMeRes,
} from '@domain/response/auth/auth-response-service';
import {
  AuthLoginReq,
  AuthMeReq,
} from '@domain/request/auth/auth-request-service';
import { Either, error, success } from '@core/either';
import { ApiResponseError, notFound, unauthorized } from '@core/api-response';
import { ErrorMessages } from '@shared/error-messages';
import { Encrypt } from '@shared/crypto';

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtProvider: IJWTProvider,
  ) {}

  async login(
    req: AuthLoginReq,
  ): Promise<Either<ApiResponseError, AuthLoginRes>> {
    const passwordEncrypted = Encrypt(req.password);

    if (!passwordEncrypted) {
      return error(unauthorized(ErrorMessages.AUTH.INVALID_CREDENTIALS));
    }

    const user = await this.userRepository.auth(req.email, passwordEncrypted);

    if (!user?._id) {
      return error(unauthorized(ErrorMessages.AUTH.INVALID_CREDENTIALS));
    }

    const JWT_EXPIRES_MINUTES = 8 * 60;

    const jwt = this.jwtProvider.create(
      {
        _id: user._id.toString(),
        name: user.name,
      },
      JWT_EXPIRES_MINUTES,
    );

    return success({ jwt });
  }

  async me(req: AuthMeReq): Promise<Either<ApiResponseError, AuthMeRes>> {
    const user = await this.userRepository.getById(req._id);

    if (!user?._id) {
      return error(notFound(ErrorMessages.AUTH.USER_NOT_FOUND));
    }

    return success({ name: user.name });
  }
}
