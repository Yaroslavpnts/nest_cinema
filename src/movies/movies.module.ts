import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { Category } from './models/category.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    SequelizeModule.forFeature([Category]),
    forwardRef(() => AuthModule),
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
