import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: 'nest_user',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Uniq identifier of user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email of user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'pass1234', description: 'Password of user' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: false, description: 'User ban status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: 'Some reason description',
    description: 'User ban reason',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}
