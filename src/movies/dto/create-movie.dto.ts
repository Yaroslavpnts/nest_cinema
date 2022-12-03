import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'La La Lend' })
  readonly name: string;
  @ApiProperty({ example: 'Some secriptions of movie' })
  readonly description: string;
  @ApiProperty({ example: [11, 22, 33] })
  readonly genres: number[];
  @ApiProperty({ example: [11, 22, 33] })
  readonly actors: number[];
  @ApiProperty({ example: [11, 22, 33] })
  readonly directors: number[];
  @ApiProperty({ example: 'PG-13' })
  readonly rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  @ApiProperty({ example: '8.0' })
  readonly imdb_rating?: string;
  @ApiProperty({ example: 'https://some-url.com' })
  readonly poster_src?: string;
  @ApiProperty({ example: 'https://some-url.com' })
  readonly id?: string;
  @ApiProperty({ example: 'https://some-url.com' })
  readonly wide_poster_src?: string;
  @ApiProperty({ example: '1996' })
  readonly production_year?: string;
  @ApiProperty({ example: '2022-12-02' })
  readonly start_date_session?: string;
  @ApiProperty({ example: '2022-12-25' })
  readonly end_date_session?: string;
}
