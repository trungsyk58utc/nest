import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DecodeToken } from 'src/utils/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private readonly decodeToken = new DecodeToken();
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await this.decodeToken.verifyAccessToken(token.split(' ')[1]);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
