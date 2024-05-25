import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'config';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  jwt.verify(token, REFRESH_TOKEN_SECRET);
};
