import { AuthService } from '@application/services/auth';
import { userRepository } from '@infra/db/mongodb/implementations/UserRepository';
import { jwtProvider } from '@infra/providers/implementation/JWTProvider';

const authFactory = new AuthService(userRepository, jwtProvider);

export { authFactory };
