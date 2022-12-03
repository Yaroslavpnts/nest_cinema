import { Controller, Post, Body, Get } from '@nestjs/common';
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
    console.log(1);
    return this.citiesService.getAllCities();
  }
}
