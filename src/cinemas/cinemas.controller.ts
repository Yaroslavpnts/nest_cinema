import { Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CinemasService } from './cinemas.service';
import { Cinema } from './models/cinemas.model';
import { Body, Get, Post, Query } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto.';

@ApiTags('Cinemas api')
@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  // @ApiOperation({ summary: 'Get all cinemas' })
  // @ApiResponse({ status: 200, type: [Cinema] })
  // @Get()
  // getAllCinemasByCity(@Query() query: { cityId: number }) {
  //   return this.cinemasService.getAllCinemasByCity(query.cityId);
  // }

  @ApiOperation({ summary: 'Get all cinemas' })
  @ApiResponse({ status: 200, type: [Cinema] })
  @Get()
  getAllCinemas() {
    return this.cinemasService.getAllCinemas();
  }

  @ApiOperation({ summary: 'Get all cinemas' })
  @ApiResponse({ status: 200, type: [Cinema] })
  @Post()
  createCinema(@Body() dto: CreateCinemaDto) {
    return this.cinemasService.createCinema(dto);
  }
}
