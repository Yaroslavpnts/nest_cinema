import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cinema } from 'src/cinemas/models/cinemas.model';
import { Session } from 'src/sessions/models/sessions.model';

interface CinemaHallCreationAttrs {
  cinemas_hall_id: number;
  name: string;
  number_of_seats: number;
  isWorking?: boolean;
  cinema_id: number;
}

@Table({
  tableName: 'cinema_halls',
  createdAt: false,
  updatedAt: false,
})
export class CinemaHall extends Model<CinemaHall, CinemaHallCreationAttrs> {
  @ApiProperty({ example: 1, description: "Cinema's hall uniq identificator" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  cinemas_hall_id: number;

  @ApiProperty({ example: '3D_MAX_Poltava', description: "Cinema's hall name" })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: '400', description: "Cinema's number of seats" })
  @Column({ type: DataType.INTEGER })
  number_of_seats: number;

  @ApiProperty({ example: 'true', description: 'true of false' })
  @Column({ type: DataType.STRING, defaultValue: true })
  isWorking: boolean;

  @ForeignKey(() => Cinema)
  @Column({ type: DataType.INTEGER })
  cinema_id: number;

  // @ApiProperty({ example: 'Cinema', description: 'Cinema' })
  @BelongsTo(() => Cinema)
  cinema: Cinema;

  // @ApiProperty({ example: 'Sessions', description: 'Sessions' })
  @HasMany(() => Session)
  sessions: Session[];
}
