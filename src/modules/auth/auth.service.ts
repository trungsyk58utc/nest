import {
  Body,
  Headers,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { DEFAULTCONFIG } from 'src/config/defaultConfig';
import { DecodeToken } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entiryManage: EntityManager,
    private readonly decodeToken: DecodeToken,
    private jwtService: JwtService,
  ) {}

  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('users')
      .select('users.password')
      .where('users.username = :username', { username })
      .getOne();
    if (!user || user?.password !== password)
      throw new UnauthorizedException('Username or password incorrect');
    return this.createToken(user.id);
  }

  async getMe(@Headers() headers: any) {
    const token = headers.authorization.split(' ')[1];
    const tokenData = await this.decodeToken.verifyAccessToken(token);
    const user = await this.userRepository.findOne({
      where: { id: tokenData.userId },
    });
    return user;
  }

  async createToken(id: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: id },
        { secret: DEFAULTCONFIG.accessTokenSecretKey, expiresIn: '20m' },
      ),
      this.jwtService.signAsync(
        { userId: id },
        { secret: DEFAULTCONFIG.refreshTokenSecretKey, expiresIn: '7d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
