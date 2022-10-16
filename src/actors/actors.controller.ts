import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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

  @ApiOperation({ summary: 'Get all movie categories' })
  @ApiResponse({ status: 200, type: Actors })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllActors(@Query() q: { [key: string]: string }) {
    return this.actorsService.getActors(q.name);
  }

  @ApiOperation({ summary: 'Get all movie categories' })
  @ApiResponse({ status: 201, type: Actors })
  @HttpCode(201)
  @Post()
  addActor(@Body() actorDto: CreateActorDto) {
    return this.actorsService.create(actorDto);
  }

  @ApiOperation({ summary: 'Get all movie categories' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  removeActor(@Param('id') id: string) {
    return this.actorsService.delete(+id);
  }
}
