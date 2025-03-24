import { Request, Response } from 'express';

export type ResponseControllerHTTP = {
  statusCode: number;
  payload: any;
  success: boolean;
};

const runAsyncWrapper = (callback: any) => {
  return (req: Request, res: Response, next: any): any => {
    callback(req, res, next).catch(next);
  };
};

const resJson = (
  response: Response,
  responseController: ResponseControllerHTTP,
): any => {
  return response.status(responseController.statusCode).jsonp({
    success: responseController.success,
    payload: responseController.payload,
  });
};

export { runAsyncWrapper, resJson };
