import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Actor } from 'src/modules/actors/entities/actor.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
import { Film } from 'src/modules/films/entities/film.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_NAME'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  migrations: ['src/migrations/**'],
  entities: [Actor, Country, User, Film],
});
