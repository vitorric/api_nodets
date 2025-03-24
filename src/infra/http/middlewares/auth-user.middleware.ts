import { Strategy as StrategyJWT, ExtractJwt } from 'passport-jwt';
import passport, { PassportStatic } from 'passport';

export default (): PassportStatic => {
  passport.use(
    'authenticated',
    new StrategyJWT(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        try {
          if (!payload.auth) {
            return done(null, false);
          }

          return done(null, {
            ...payload.auth,
          });
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );

  return passport;
};
