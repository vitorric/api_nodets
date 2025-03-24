import { IJWTProvider } from 'src/interfaces/providers/jwt-provider.interface';
import JWT from 'jsonwebtoken';
import { TJWTUser } from '@domain/types';

class JWTProvider implements IJWTProvider {
  create(user: TJWTUser, minutes: number): string | null {
    try {
      return JWT.sign(
        {
          auth: user,
          exp: Math.floor(Date.now() / 1000) + 60 * minutes,
        },
        process.env.JWT_SECRET,
      );
    } catch (error) {
      console.log('createToken', error);
      return null;
    }
  }
}

export const jwtProvider = new JWTProvider();
