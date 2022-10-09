import {
  Model,
  Table,
} from 'sequelize-typescript';

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: 'movies',
  createdAt: false,
  updatedAt: false,
})
export class Movies extends Model<Movies, RolesCreationAttrs> {}
