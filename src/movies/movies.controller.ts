import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Category } from './models/category.model';
import { Movies } from './models/movies.model';
import { MoviesService } from './movies.service';

@ApiTags('Movies api')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, type: [Movies] })
  @Get('')
  getAllMovies() {
    return this.moviesService.getAllFilms();
  }

  @ApiOperation({ summary: 'Remove movie' })
  @ApiResponse({ status: 204 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.removeMovie(+id);
  }

  @ApiOperation({ summary: 'Add movie' })
  @ApiResponse({ status: 201, type: Movies })
  @Post()
  addMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.addMovie(dto);
  }

  @ApiOperation({ summary: 'Add movie' })
  @ApiResponse({ status: 201, type: Movies })
  @Patch()
  updateMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.updateMovie(dto);
  }

  @ApiOperation({ summary: 'Get all movie categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  getAllCategories() {
    return this.moviesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 204, type: Category })
  @Post('/categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.moviesService.createCategory(dto);
  }
}
