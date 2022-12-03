import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { Session } from 'src/sessions/models/sessions.model';
import { CreateCinemaHallDto } from './dto/create-cinema_hall.dto';
import { CinemaHall } from './models/cinemas_hall.model';

@Injectable()
export class CinemaHallsService {
  constructor(
    @InjectModel(CinemaHall) private cinemaHallRepository: typeof CinemaHall,
  ) {}

  async createCinemaHall(dto: CreateCinemaHallDto) {
    const cinemaHall = this.cinemaHallRepository.create(dto);

    return cinemaHall;
  }

  async getCinemaHallsWithSessions(cinema_id: number) {
    const cinemaHalls = this.cinemaHallRepository.findAll({
      where: { cinema_id },
      include: Session,
    });

    return cinemaHalls;
  }
}
