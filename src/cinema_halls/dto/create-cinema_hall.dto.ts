import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaHallDto {
  @ApiProperty({ example: 'Poltava 3DX' })
  readonly name: string;

  @ApiProperty({ example: 400 })
  readonly number_of_seats: number;

  @ApiProperty({ example: 5 })
  readonly cinema_id: number;
}
