import { ErrorMessages } from '@shared/error-messages';
import { Encrypt } from '@shared/crypto';
import { createAuthServiceMocks } from '@tests/mocks/auth-service.mocks';

// 🔧 Mock do Encrypt (como é uma função externa)
jest.mock('@shared/crypto', () => ({
  Encrypt: jest.fn(),
}));

describe('AuthService', () => {
  const { authServiceMock, userRepositoryMock, jwtProviderMock } =
    createAuthServiceMocks();

  const fakeUser = {
    _id: 'user-id-123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'encrypted-pass',
    status: true,
    deleted: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const validRequest = {
      email: 'john@example.com',
      password: 'plaintext123',
    };

    it('should return success with JWT when credentials are valid', async () => {
      (Encrypt as jest.Mock).mockReturnValue('encrypted-pass');
      userRepositoryMock.auth.mockResolvedValue(fakeUser);
      jwtProviderMock.create.mockReturnValue('jwt-token');

      const result = await authServiceMock.login(validRequest);

      expect(Encrypt).toHaveBeenCalledWith(validRequest.password);
      expect(userRepositoryMock.auth).toHaveBeenCalledWith(
        validRequest.email,
        'encrypted-pass',
      );
      expect(jwtProviderMock.create).toHaveBeenCalledWith(
        { _id: fakeUser._id, name: fakeUser.name },
        480,
      );

      expect(result.isSuccess()).toBe(true);
      if (result.isSuccess()) {
        expect(result.value.jwt).toBe('jwt-token');
      }
    });

    it('should return unauthorized if Encrypt returns null', async () => {
      (Encrypt as jest.Mock).mockReturnValue(null);

      const result = await authServiceMock.login(validRequest);

      expect(result.isError()).toBe(true);
      if (result.isError()) {
        expect(result.value.payload.error).toBe(
          ErrorMessages.AUTH.INVALID_CREDENTIALS,
        );
      }
    });

    it('should return unauthorized if user is not found', async () => {
      (Encrypt as jest.Mock).mockReturnValue('encrypted-pass');
      userRepositoryMock.auth.mockResolvedValue(null);

      const result = await authServiceMock.login(validRequest);

      expect(result.isError()).toBe(true);
      if (result.isError()) {
        expect(result.value.payload.error).toBe(
          ErrorMessages.AUTH.INVALID_CREDENTIALS,
        );
      }
    });
  });

  describe('me', () => {
    const validRequest = {
      _id: 'user-id-123',
      name: 'John Doe',
    };

    it('should return user name when user exists', async () => {
      userRepositoryMock.getById.mockResolvedValue(fakeUser);

      const result = await authServiceMock.me(validRequest);

      expect(userRepositoryMock.getById).toHaveBeenCalledWith('user-id-123');
      expect(result.isSuccess()).toBe(true);
      if (result.isSuccess()) {
        expect(result.value.name).toBe('John Doe');
      }
    });

    it('should return not found error when user is not found', async () => {
      userRepositoryMock.getById.mockResolvedValue(null);

      const result = await authServiceMock.me(validRequest);

      expect(userRepositoryMock.getById).toHaveBeenCalledWith('user-id-123');
      expect(result.isError()).toBe(true);
      if (result.isError()) {
        expect(result.value.payload.error).toBe(
          ErrorMessages.AUTH.USER_NOT_FOUND,
        );
      }
    });
  });
});
