import { JwtService } from '@nestjs/jwt';
import { DEFAULTCONFIG } from 'src/config/defaultConfig';

export class DecodeToken {
  private readonly decodeAccess = new JwtService({
    secret: DEFAULTCONFIG.accessTokenSecretKey,
  });
  private readonly decodeRefresh = new JwtService({
    secret: DEFAULTCONFIG.refreshTokenSecretKey,
  });

  async verifyAccessToken(token: string) {
    const tokenData = await this.decodeAccess.verify(token);
    return tokenData;
  }

  async verifyRefreshToken(token: string) {
    const tokenData = await this.decodeRefresh.verify(token);
    return tokenData;
  }
}
