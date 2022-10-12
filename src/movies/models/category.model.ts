import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CategoriesMovies } from './categories-movies.model';
import { Movies } from './movies.model';

@Table({
  tableName: 'category',
  createdAt: false,
  updatedAt: false,
})
export class Category extends Model<Category> {
  @ApiProperty({ example: 1, description: 'Uniq identifier of category' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Action', description: 'Name of movie category' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @BelongsToMany(() => Movies, () => CategoriesMovies)
  movies: Movies[];
}
