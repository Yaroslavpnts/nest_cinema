import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DirectorsMovies } from 'src/movies/models/directors-movies.model';
import { Movies } from 'src/movies/models/movies.model';

@Table({
  tableName: 'directors',
  createdAt: false,
  updatedAt: false,
})
export class Directors extends Model<Directors> {
  @ApiProperty({ example: 1, description: 'Directors uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Quentin Tarantino', description: 'Directors name' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: '1963-03-27', description: 'Directors birthday' })
  @Column({ type: DataType.STRING })
  birthday: string;

  @ApiProperty({ example: 'Knoxville', description: 'Directors city' })
  @Column({ type: DataType.STRING })
  city: string;

  @ApiProperty({ example: 'USA', description: 'Directors country' })
  @Column({ type: DataType.STRING })
  country: string;

  @ApiProperty({ example: 'https://some-url.com', description: 'Directors photo link' })
  @Column({ type: DataType.STRING })
  photo_src?: string;
  
  @BelongsToMany(() => Movies, () => DirectorsMovies)
  movies: Movies[];
}
