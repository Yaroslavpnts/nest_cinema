import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDto {
  @ApiProperty({ example: 1 })
  readonly city_id: number;

  @ApiProperty({ example: 1000 })
  readonly total_number_of_seats: number;

  @ApiProperty({ example: 'Poltava, Gogol street, 7' })
  readonly adress: string;
}
