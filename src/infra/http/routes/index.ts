import routeAuth from './auth';

const routes = (app: any): any => {
  app.use('/v1/auth', routeAuth);
};

export { routes };
