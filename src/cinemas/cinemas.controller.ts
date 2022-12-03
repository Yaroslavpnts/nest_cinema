import { Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CinemasService } from './cinemas.service';
import { Cinema } from './models/cinemas.model';
import { Body, Get, Post } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto.';

@ApiTags('Cinemas api')
@Controller('cinemas')
export class CinemasController {
  constructor(private moviesService: CinemasService) {}

  @ApiOperation({ summary: 'Get all cinemas' })
  @ApiResponse({ status: 200, type: [Cinema] })
  @Get()
  getAllCinemas() {
    return this.moviesService.getAllCinemas();
  }

  @ApiOperation({ summary: 'Get all cinemas' })
  @ApiResponse({ status: 200, type: [Cinema] })
  @Post()
  createCinema(@Body() dto: CreateCinemaDto) {
    return this.moviesService.createCinema(dto);
  }
}
