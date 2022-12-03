import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ActorsMovies } from 'src/movies/models/actors-movies.model';
import { Movies } from 'src/movies/models/movies.model';

@Table({
  tableName: 'actors',
  createdAt: false,
  updatedAt: false,
})
export class Actors extends Model<Actors> {
  @ApiProperty({ example: 1, description: 'Actors uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  actor_id: number;

  @ApiProperty({ example: 'Bradd Pitt', description: 'Actors name' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: '1963-12-18', description: 'Actors birthday' })
  @Column({ type: DataType.STRING })
  birthday: string;

  @ApiProperty({ example: 'Shawnee', description: 'Actors city' })
  @Column({ type: DataType.STRING })
  city: string;

  @ApiProperty({ example: 'USA', description: 'Actors country' })
  @Column({ type: DataType.STRING })
  country: string;

  @ApiProperty({ example: 'USA', description: 'Actors photo link' })
  @Column({ type: DataType.STRING })
  photo_src: string;

  @BelongsToMany(() => Movies, () => ActorsMovies)
  movies: Movies[];
}
