import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Directors } from 'src/directors/models/director.model';
import { Movies } from './movies.model';

@Table({
  tableName: 'movie_directors',
  createdAt: false,
  updatedAt: false,
})
export class DirectorsMovies extends Model<DirectorsMovies> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.INTEGER })
  filmId: number;

  @ForeignKey(() => Directors)
  @Column({ type: DataType.INTEGER })
  directorId: number;
}
