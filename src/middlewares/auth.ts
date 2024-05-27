import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from 'helpers';
import CreateHttpError from 'http-errors';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(CreateHttpError.Unauthorized('Missing authorization header'));

  const user = verifyAccessToken(token);
  if (!user) return res.status(403).json({ message: 'Empty payload' });
  Object.assign(req, { user });

  return next();
};
