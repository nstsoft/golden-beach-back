import { NextFunction, Request, Response } from 'express';
import CreateHttpError from 'http-errors';

export const isValidPassphrase = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.passphrase;
  if (process.env.ADMIN_PASSPHRASE !== header) {
    return next(CreateHttpError.Unauthorized('Wrong passphrase'));
  }

  return next();
};
