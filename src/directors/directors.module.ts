import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectorController } from './directors.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Directors } from './models/director.model';
import { DirectorsService } from './director.service';
import { Movies } from 'src/movies/models/movies.model';
import { DirectorsMovies } from 'src/movies/models/directors-movies.model';

@Module({
  providers: [DirectorsService],
  controllers: [DirectorController],
  imports: [
    SequelizeModule.forFeature([Directors, Movies, DirectorsMovies]),
    forwardRef(() => AuthModule),
  ],
  exports: [DirectorsService],
})
export class DirectorModule {}
