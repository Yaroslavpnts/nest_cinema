import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Poltava' })
  readonly name: string;
}
