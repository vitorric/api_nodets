import { IJWTProvider, JWTUser } from 'src/interfaces/providers/IJWTProvider';
import JWT from 'jsonwebtoken';

class JWTProvider implements IJWTProvider {
  create(user: JWTUser, minutes: number): string | null {
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
