import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Directors } from './models/director.model';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectModel(Directors) private directorsRepository: typeof Directors,
  ) {}

  async getAll() {
    const actors = await this.directorsRepository.findAll();
    return actors;
  }

  async create(dto: CreateDirectorDto) {
    const actor = await this.directorsRepository.create(dto);
    return actor;
  }

  async delete(id: number) {
    const actor = await this.directorsRepository.destroy({ where: { id } });
    return actor;
  }
}
