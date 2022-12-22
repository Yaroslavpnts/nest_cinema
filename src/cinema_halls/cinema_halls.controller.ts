import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CinemaHallsService } from './cinema_halls.service';
import { CreateCinemaHallDto } from './dto/create-cinema_hall.dto';

@ApiTags('Cinema halls api')
@Controller('cinema_halls')
export class CinemaHallsController {
  constructor(private cinemaHallsService: CinemaHallsService) {}

  @Get(':id')
  getCinemaHallsWithSessions(@Param('id') id: number) {
    return this.cinemaHallsService.getCinemaHallsWithSessionsByCinema(id);
  }

  @Get()
  getCinemaHalls() {
    return this.cinemaHallsService.getCinemaHalls();
  }

  @Post()
  createCinemaHall(@Body() dto: CreateCinemaHallDto) {
    return this.cinemaHallsService.createCinemaHall(dto);
  }
}

// ;
// createCinemaHall;
