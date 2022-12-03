import { Controller, Post, Body } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto.';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  createSession(@Body() dto: CreateSessionDto) {
    return this.sessionsService.createSession(dto);
  }
}
