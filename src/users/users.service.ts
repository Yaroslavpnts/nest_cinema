import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);

      const role = await this.rolesService.getRoleByValue('USER');

      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (err) {
      const [error] = err.errors;
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async giveNewRole(email: string, roleId: number) {
    const user = await this.getUserByEmail(email);
    const prevRoles = user.roles.map((i) => i.id);
    await user.$set('roles', [...prevRoles, roleId]);
  }

  async removeOneRole(email: string, roleId: number) {
    const user = await this.getUserByEmail(email);
    const updatedRoles = user.roles.filter((i) => i.id !== roleId);
    await user.$set('roles', updatedRoles);
  }
}
