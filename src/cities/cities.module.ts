import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from './models/cities.model';

@Module({
  providers: [CitiesService],
  controllers: [CitiesController],
  imports: [SequelizeModule.forFeature([City])],
})
export class CitiesModule {}
