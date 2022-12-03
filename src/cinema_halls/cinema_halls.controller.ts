import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CinemaHallsService } from './cinema_halls.service';
import { CreateCinemaHallDto } from './dto/create-cinema_hall.dto';

@ApiTags('Cinema halls api')
@Controller('cinemaHalls')
export class CinemaHallsController {
  constructor(private cinemaHallsService: CinemaHallsService) {}

  @Get(':id')
  getCinemaHallsWithSessions(@Param('id') id: number) {
    return this.cinemaHallsService.getCinemaHallsWithSessions(id);
  }

  @Post()
  createCinemaHall(@Body() dto: CreateCinemaHallDto) {
    return this.cinemaHallsService.createCinemaHall(dto);
  }
}

// ;
// createCinemaHall;
