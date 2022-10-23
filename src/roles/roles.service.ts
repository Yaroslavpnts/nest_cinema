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
    const response = this.rolesRepository.findOne({
      where: { value },
      include: { all: true },
    });
    return response;
  }

  async getRoleById(id: string) {
    const response = this.rolesRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return response;
  }
}
