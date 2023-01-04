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

  async getSessionById(session_id: number) {
    return await this.sessionRepository.findOne({
      where: { session_id },
      include: [Movies, CinemaHall],
    });
  }

  async createOneSession(dto: CreateSessionDto) {
    const cinemaHall = await this.cinemaHallRepository.findOne({
      where: { cinemas_hall_id: dto.cinema_hall_id },
    });

    const session = await this.sessionRepository.create(
      {
        ...dto,
        available_seats: cinemaHall.number_of_seats,
      },
      {
        include: [Movies, CinemaHall],
      },
    );

    return await this.getSessionById(session.session_id);
  }

  async createSessions(dto: CreateSessionDto[]) {
    const sessions = dto.map((session) => this.createOneSession(session));

    const result = await Promise.all(sessions);

    return result;
  }

  async getSessionsByDate(date: string) {
    const sessions = await this.sessionRepository.findAll({
      where: { date },
      include: [Movies, CinemaHall],
    });

    return sessions;
  }

  async getSessions() {
    const sessions = await this.sessionRepository.findAll({
      include: [Movies, CinemaHall],
    });

    return sessions;
  }
}
