import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cinema } from 'src/cinemas/models/cinemas.model';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';
import { Session } from 'src/sessions/models/sessions.model';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './models/cities.model';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async addCity(dto: CreateCityDto) {
    const city = await this.cityRepository.create(dto);
    return city;
  }

  // async getAllCities() {
  //   const cities = await this.cityRepository.findAll();
  //   return cities;
  // }

  async getAllCities() {
    const city = await this.cityRepository.findAll({
      // where: { city_id },
      include: [
        { model: Cinema, include: [{ model: CinemaHall, include: [Session] }] },
      ],
    });

    return city;
  }
}
