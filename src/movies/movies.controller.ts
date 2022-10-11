import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Category } from './models/category.model';
import { MoviesService } from './movies.service';

@ApiTags('Movies api')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movie categories' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  getAllCategories() {
    return this.moviesService.getAllCategories();
  }
}
