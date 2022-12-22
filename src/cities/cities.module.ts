import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './models/cities.model';
import { Cinema } from 'src/cinemas/models/cinemas.model';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';

@Module({
  providers: [CitiesService],
  controllers: [CitiesController],
  imports: [SequelizeModule.forFeature([City, Cinema, CinemaHall])],
})
export class CitiesModule {}
