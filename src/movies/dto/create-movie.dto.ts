import { ApiProperty } from "@nestjs/swagger";

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
}
