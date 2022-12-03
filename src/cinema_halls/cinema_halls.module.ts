import { Module } from '@nestjs/common';
import { CinemaHallsService } from './cinema_halls.service';
import { CinemaHallsController } from './cinema_halls.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CinemaHall } from './models/cinemas_hall.model';

@Module({
  providers: [CinemaHallsService],
  controllers: [CinemaHallsController],
  imports: [SequelizeModule.forFeature([CinemaHall])],
})
export class CinemaHallsModule {}
