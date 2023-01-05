import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actors } from './models/actors.model';

@ApiTags('Actors api')
@Controller('actors')
export class ActorsController {
  constructor(private actorsService: ActorsService) {}

  @ApiOperation({ summary: 'Get all actors' })
  @ApiResponse({ status: 200, type: Actors })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get()
  getActorsPagination(@Query() query: { page: string; size: string }) {
    return this.actorsService.getActorsPagination(query.page, query.size);
  }

  @ApiOperation({ summary: 'Get all actors' })
  @ApiResponse({ status: 200, type: Actors })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllActors() {
    return this.actorsService.getAllActors();
  }

  @ApiOperation({ summary: 'Get one actor' })
  @ApiResponse({ status: 200, type: Actors })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneActor(@Param('id') id: number) {
    return this.actorsService.getOneActor(id);
  }

  @ApiOperation({ summary: 'Add actor' })
  @ApiResponse({ status: 201, type: Actors })
  @HttpCode(201)
  @Post()
  addActor(@Body() actorDto: CreateActorDto) {
    return this.actorsService.create(actorDto);
  }

  @ApiOperation({ summary: 'Add actor' })
  @ApiResponse({ status: 201, type: Actors })
  @HttpCode(201)
  @Patch(':id')
  updateActor(@Param('id') id: string, @Body() actorDto: CreateActorDto) {
    return this.actorsService.update(id, actorDto);
  }

  @ApiOperation({ summary: 'Remove actor' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  removeActor(@Param('id') id: string) {
    return this.actorsService.delete(+id);
  }
}
