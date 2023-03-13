import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    console.log('1111111111111111111', value);
    const response = await this.rolesRepository.findOne({
      where: { value },
    });
    console.log('22222222222', value);
    return response;
  }

  async getRoleById(id: string) {
    const response = await this.rolesRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return response;
  }
}
