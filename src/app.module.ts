import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/models/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorModule } from './directors/directors.module';
import { SessionsModule } from './sessions/sessions.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { CitiesModule } from './cities/cities.module';
import { CinemaHallsModule } from './cinema_halls/cinema_halls.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    // SequelizeModule.forRoot({
    //   dialect: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: Number(process.env.MYSQL_PORT),
    //   username: process.env.MYSQL_USERNAME,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DB,
    //   models: [User, Roles, UserRoles],
    //   autoLoadModels: true,
    // }),
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadModels: true,
          synchronize: true,
          models: [User, Roles, UserRoles],
        };
      },
    }),
    AuthModule,
    ActorsModule,
    UsersModule,
    RolesModule,
    MoviesModule,
    DirectorModule,
    SessionsModule,
    CinemasModule,
    CitiesModule,
    CinemaHallsModule,
  ],
})
export class AppModule {}
