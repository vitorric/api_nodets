import { Request, Response, Router } from 'express';
import passport from 'passport';

import { resJson, runAsyncWrapper } from '@infra/http/adpter';
import { authController } from '@application/controller/auth.controller';

const router = Router();

const authenticated = passport.authenticate('authenticated', {
  session: false,
});

router.post(
  '/login',
  runAsyncWrapper(async (request: Request, response: Response) =>
    resJson(response, await authController.login(request)),
  ),
);

router.get(
  '/me',
  authenticated,
  runAsyncWrapper(async (request: Request, response: Response) =>
    resJson(response, await authController.me(request)),
  ),
);

export default router;
