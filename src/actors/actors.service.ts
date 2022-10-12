import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actors } from './models/actors.model';

@Injectable()
export class ActorsService {
    constructor(@InjectModel(Actors) private actorsRepository: typeof Actors) {}

    async getAll() {
        const actors = await this.actorsRepository.findAll();
        return actors;
    }

    async create(dto: CreateActorDto) {
        const actor = await this.actorsRepository.create(dto);
        return actor;
    }

    async delete(id: number) {
        const actor = await this.actorsRepository.destroy({ where: { actor_id: id }});
        return actor;
    }
}
