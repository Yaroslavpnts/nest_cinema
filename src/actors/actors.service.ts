import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Movies } from 'src/movies/models/movies.model';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actors } from './models/actors.model';

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actors) private actorsRepository: typeof Actors) {}

  async getActorsPagination(page: string, size: string) {
    // const actors = await this.actorsRepository.findAll({
    //   where: {
    //     name: {
    //       [Op.like]: '%' + (name || '') + '%',
    //     },
    //   },
    // });

    const pageAsNumber = Number.parseInt(page);
    const sizeAsNumber = Number.parseInt(size);

    let currentPage = 0;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) {
      currentPage = pageAsNumber;
    }

    let currentSize = 10;

    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      currentSize = sizeAsNumber;
    }

    const result = await this.actorsRepository.findAndCountAll({
      limit: +currentSize,
      offset: +currentPage * +currentSize,
      distinct: true,
    });

    return {
      content: result.rows,
      totalPages: Math.ceil(result.count / currentSize),
      totalCount: result.count,
    };
  }

  async getAllActors() {
    const actors = await this.actorsRepository.findAll();
    return actors;
  }

  async getOneActor(id: number) {
    const actor = await this.actorsRepository.findOne({
      where: {
        actor_id: id,
      },
      include: [
        {
          model: Movies,
          through: { attributes: [] },
        },
      ],
    });
    return actor;
  }

  async create(dto: CreateActorDto) {
    try {
      const actor = await this.actorsRepository.create(dto);
      return actor;
    } catch (err) {
      const [error] = err.errors;
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async update(id: string, dto: CreateActorDto) {
    try {
      await this.actorsRepository.update(dto, {
        where: { actor_id: id },
      });
      return true;
    } catch (err) {
      const [error] = err.errors;
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async delete(id: number) {
    const actor = await this.actorsRepository.destroy({
      where: { actor_id: id },
    });

    return actor;
  }
}
