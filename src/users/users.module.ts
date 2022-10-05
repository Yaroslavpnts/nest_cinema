import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Roles])],
})
export class UsersModule {}
