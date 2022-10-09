import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

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
  category_id: number;

  @ApiProperty({ example: 'Action', description: 'Name of movie category' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;
}
