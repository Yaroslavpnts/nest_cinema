import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCinemaDto } from './dto/create-cinema.dto.';
import { Cinema } from './models/cinemas.model';

@Injectable()
export class CinemasService {
  constructor(@InjectModel(Cinema) private cinemasRepository: typeof Cinema) {}

  async getAllCinemas() {
    const result = await this.cinemasRepository.findAll();

    return result;
  }

  // async getAllCinemasByCity(city_id: number) {
  //   const cinemas = await this.cinemasRepository.findAll({
  //     where: {
  //       city_id,
  //     },
  //   });

  //   return cinemas;
  // }

  async createCinema(dto: CreateCinemaDto) {
    const result = await this.cinemasRepository.create(dto);
    return result;
  }
}
