import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Actors } from 'src/actors/models/actors.model';
import { Movies } from './movies.model';

@Table({
  tableName: 'movie_actors',
  createdAt: false,
  updatedAt: false,
})
export class ActorsMovies extends Model<ActorsMovies> {
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

  @ForeignKey(() => Actors)
  @Column({ type: DataType.INTEGER })
  actorId: number;
}
