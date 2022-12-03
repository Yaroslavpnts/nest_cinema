import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ example: '2022-12-03' })
  readonly date: string;

  @ApiProperty({ example: '14:00' })
  readonly session_start: string;

  @ApiProperty({ example: '16:00' })
  readonly session_end: string;

  @ApiProperty({ example: 1 })
  readonly cinema_hall_id: number;

  @ApiProperty({ example: 1 })
  readonly movie_id: number;
}
