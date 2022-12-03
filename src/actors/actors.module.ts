import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActorsController } from './actors.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Actors } from './models/actors.model';
import { ActorsService } from './actors.service';
import { Movies } from 'src/movies/models/movies.model';
import { ActorsMovies } from 'src/movies/models/actors-movies.model';

@Module({
  providers: [ActorsService],
  controllers: [ActorsController],
  imports: [
    SequelizeModule.forFeature([Actors, Movies, ActorsMovies]),
    forwardRef(() => AuthModule),
  ],
  exports: [ActorsService],
})
export class ActorsModule {}
