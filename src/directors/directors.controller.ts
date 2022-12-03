import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DirectorsService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Directors } from './models/director.model';

@ApiTags('Directors api')
@Controller('directors')
export class DirectorController {
  constructor(private directorsService: DirectorsService) {}

  @ApiOperation({ summary: 'Get all movie directors' })
  @ApiResponse({ status: 200, type: Directors })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllDirectors() {
    return this.directorsService.getAll();
  }

  @ApiOperation({ summary: 'Add director' })
  @ApiResponse({ status: 201, type: Directors })
  @HttpCode(201)
  @Post()
  addDirector(@Body() actorDto: CreateDirectorDto) {
    return this.directorsService.create(actorDto);
  }

  @ApiOperation({ summary: 'Remove particular director' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  removeDirector(@Param('id') id: string) {
    return this.directorsService.delete(+id);
  }
}
