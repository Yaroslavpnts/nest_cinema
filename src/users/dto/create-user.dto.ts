import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  readonly email: string;
  @ApiProperty({ example: 'admin' })
  readonly password: string;
}
