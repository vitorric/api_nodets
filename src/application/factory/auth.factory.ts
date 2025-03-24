import { AuthService } from '@application/services/auth';
import { userRepository } from '@infra/db/mongodb/implementations/user.repository';
import { jwtProvider } from '@infra/providers/implementation/jwt-provider';

const authFactory = new AuthService(userRepository, jwtProvider);

export { authFactory };
