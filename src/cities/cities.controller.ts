import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './models/cities.model';

@ApiTags('Cities api')
@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Add city' })
  @ApiResponse({ status: 201, type: City })
  @Post()
  addCity(@Body() dto: CreateCityDto) {
    return this.citiesService.addCity(dto);
  }

  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, type: [City] })
  @Get()
  getAllCities() {
    return this.citiesService.getAllCities();
  }

  // @ApiOperation({ summary: 'Get one city' })
  // @ApiResponse({ status: 200, type: City })
  // @Get(':id')
  // getOneCity(@Param('id') id: string) {
  //   console.log(id);
  //   return this.citiesService.findCityWithCinemasCinemaHallsAndSessions(+id);
  // }
}
