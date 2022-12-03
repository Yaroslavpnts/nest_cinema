import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './models/sessions.model';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';

@Module({
  providers: [SessionsService],
  controllers: [SessionsController],
  imports: [SequelizeModule.forFeature([Session, CinemaHall])],
})
export class SessionsModule {}
