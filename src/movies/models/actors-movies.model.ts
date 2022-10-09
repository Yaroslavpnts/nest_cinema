import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

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
}
