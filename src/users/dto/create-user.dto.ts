import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'newMail@gmail.com' })
  readonly email: string;
  @ApiProperty({ example: '12345678' })
  readonly password: string;
}
