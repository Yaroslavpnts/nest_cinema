import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, GiveRoleDto } from './dto/create-user.dto';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@ApiTags('Users api')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation method' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Users list' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Particular user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getOne(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Give new role for user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post('/role')
  giveRoleUser(@Body() body: GiveRoleDto) {
    return this.userService.giveNewRole(body.email, body.roleId);
  }

  @ApiOperation({ summary: 'Remove one role for user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post('/role/remove')
  removeOneRole(@Body() body: GiveRoleDto) {
    return this.userService.removeOneRole(body.email, body.roleId);
  }
}
