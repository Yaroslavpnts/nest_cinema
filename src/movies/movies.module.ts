import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { Category } from './models/category.model';
import { AuthModule } from 'src/auth/auth.module';
import { Actors } from 'src/actors/models/actors.model';
import { Directors } from 'src/directors/models/director.model';
import { Movies } from './models/movies.model';
import { CategoriesMovies } from './models/categories-movies.model';
import { DirectorsMovies } from './models/directors-movies.model';
import { ActorsMovies } from './models/actors-movies.model';
import { Session } from 'src/sessions/models/sessions.model';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    SequelizeModule.forFeature([
      Category,
      Actors,
      Directors,
      Movies,
      CategoriesMovies,
      DirectorsMovies,
      ActorsMovies,
      Session,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
