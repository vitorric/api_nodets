import { mock } from 'jest-mock-extended';
import { IUserRepository } from '@interfaces/repository/user-repository.interface';
import { IJWTProvider } from '@interfaces/providers/jwt-provider.interface';
import { AuthService } from '@application/services/auth';
import { _MockProxy } from 'jest-mock-extended/lib/Mock';

export const createAuthServiceMocks = (): {
  authServiceMock: AuthService;
  userRepositoryMock: _MockProxy<IUserRepository>;
  jwtProviderMock: _MockProxy<IJWTProvider>;
} => {
  const userRepositoryMock = mock<IUserRepository>();
  const jwtProviderMock = mock<IJWTProvider>();
  const authServiceMock = new AuthService(userRepositoryMock, jwtProviderMock);

  return { authServiceMock, userRepositoryMock, jwtProviderMock };
};
