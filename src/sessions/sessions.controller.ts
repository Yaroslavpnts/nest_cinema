import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { CreateSessionDto } from './dto/create-session.dto.';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  createSession(@Body() dto: CreateSessionDto[]) {
    return this.sessionsService.createSessions(dto);
  }

  @Get()
  getAllSessions() {
    return this.sessionsService.getSessions();
  }

  @Get(':date')
  getSessionsByDate(@Param('date') date: string) {
    return this.sessionsService.getSessionsByDate(date);
  }
}
