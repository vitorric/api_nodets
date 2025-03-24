import passport from 'passport';

import authUser from './auth-user.middleware';

const middlewares = (app: any): void => {
  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  authUser();

  app.use(passport.initialize());
};

export { middlewares };
