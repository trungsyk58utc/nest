import { config } from 'dotenv';

config();

export const DEFAULTCONFIG = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
};
