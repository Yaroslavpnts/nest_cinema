import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { Cinema } from './models/cinemas.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [CinemasService],
  controllers: [CinemasController],
  imports: [SequelizeModule.forFeature([Cinema])],
})
export class CinemasModule {}
