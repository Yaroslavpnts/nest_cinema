import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './models/roles.model';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation method' })
  @ApiResponse({ status: 201, type: Roles })
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'RoleGet particular role' })
  @ApiResponse({ status: 200, type: [Roles] })
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
