import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';
import { Movies } from 'src/movies/models/movies.model';
import { CreateSessionDto } from './dto/create-session.dto.';
import { Session } from './models/sessions.model';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    @InjectModel(CinemaHall) private cinemaHallRepository: typeof CinemaHall,
  ) {}

  async createSession(dto: CreateSessionDto) {
    const cinemaHall = await this.cinemaHallRepository.findOne({
      where: { cinemas_hall_id: dto.cinema_hall_id },
    });

    const session = await this.sessionRepository.create({
      ...dto,
      available_seats: cinemaHall.number_of_seats,
    });

    return session;
  }

  getSessionsByDate(date: string) {
    const sessions = this.sessionRepository.findAll({
      where: { date },
      include: [Movies, CinemaHall],
    });

    return sessions;
  }
}
