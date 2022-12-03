import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './models/cities.model';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async addCity(dto: CreateCityDto) {
    const city = await this.cityRepository.create(dto);
    return city;
  }

  async getAllCities() {
    const cities = await this.cityRepository.findAll();
    return cities;
  }
}
