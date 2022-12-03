import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { UserRoles } from '../user-roles.model';

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
  createdAt: false,
  updatedAt: false,
})
export class Roles extends Model<Roles, RolesCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Uniq identifier of role' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Uniq role of user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description of role' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  roles: User[];
}
