import { ApiProperty } from '@nestjs/swagger';
import { ENUM } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Actors } from 'src/actors/models/actors.model';
import { Directors } from 'src/directors/models/director.model';
import { Session } from 'src/sessions/models/sessions.model';
import { ActorsMovies } from './actors-movies.model';
import { CategoriesMovies } from './categories-movies.model';
import { Category } from './category.model';
import { DirectorsMovies } from './directors-movies.model';

interface MovieCreationAttrs {
  name: string;
  description: string;
  genres: number[];
  actors: number[];
  directors: number[];
  rating?: string;
  imdb_rating?: string;
  poster_src?: string;
  wide_poster_src?: string;
  production_year?: string;
  start_date_session?: string;
  end_date_session?: string;
  duration: number;
}

@Table({
  tableName: 'movies',
  createdAt: false,
  updatedAt: false,
})
export class Movies extends Model<Movies, MovieCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Uniq identifier of movie' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'La La Land', description: 'Films name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Short description to movie',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 'PG', description: 'Rating of movie' })
  @Column({ type: ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') })
  rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';

  @ApiProperty({ example: '8.0', description: 'Rating from imdb platform' })
  @Column({ type: DataType.STRING })
  imdb_rating: string;

  @ApiProperty({
    example: 'https://some-url.com',
    description: 'Link to movies poster',
  })
  @Column({ type: DataType.STRING })
  poster_src: string;

  @ApiProperty({
    example: 'https://some-url.com',
    description: 'Link to wide movies poster',
  })
  @Column({ type: DataType.STRING })
  wide_poster_src: string;

  @ApiProperty({
    example: '1992',
    description: 'Production year of the movie',
  })
  @Column({ type: DataType.STRING })
  production_year: string;

  @ApiProperty({
    example: '120',
    description: 'Movie duration',
  })
  @Column({ type: DataType.NUMBER })
  duration: number;

  @Column({ type: DataType.STRING, allowNull: true })
  start_date_session: string;

  @Column({ type: DataType.STRING, allowNull: true })
  end_date_session: string;

  @BelongsToMany(() => Category, () => CategoriesMovies)
  genres: Category[];

  @BelongsToMany(() => Directors, () => DirectorsMovies)
  directors: Directors[];

  @BelongsToMany(() => Actors, () => ActorsMovies)
  actors: Actors[];

  @HasMany(() => Session)
  sessions: Session[];
}
