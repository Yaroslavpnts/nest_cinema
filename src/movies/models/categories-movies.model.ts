import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { Movies } from './movies.model';

@Table({
  tableName: 'movie_categories',
  createdAt: false,
  updatedAt: false,
})
export class CategoriesMovies extends Model<CategoriesMovies> {
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

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;
}
