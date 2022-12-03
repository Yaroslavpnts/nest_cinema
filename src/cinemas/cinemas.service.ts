import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCinemaDto } from './dto/create-cinema.dto.';
import { Cinema } from './models/cinemas.model';

@Injectable()
export class CinemasService {
  constructor(@InjectModel(Cinema) private cinemasRepository: typeof Cinema) {}

  async getAllCinemas() {
    console.log(2222);
    const result = await this.cinemasRepository.findAll();
    console.log(3333, result);

    return result;
  }

  async createCinema(dto: CreateCinemaDto) {
    const result = await this.cinemasRepository.create(dto);
    return result;
  }
}
