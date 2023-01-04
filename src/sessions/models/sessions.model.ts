import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';
import { Movies } from 'src/movies/models/movies.model';

interface SessionCreationAttrs {
  date: string;
  session_start: string;
  session_end: string;
  available_seats?: number;
  cinema_hall_id: number;
  movie_id: number;
}

@Table({
  tableName: 'sessions',
  createdAt: false,
  updatedAt: false,
})
export class Session extends Model<Session, SessionCreationAttrs> {
  @ApiProperty({ example: 1, description: "Session's uniq identificator" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  session_id: number;

  @ApiProperty({ example: '2022-12-01', description: "Session's day" })
  @Column({ type: DataType.DATEONLY })
  date: string;

  @ApiProperty({ example: '14:00', description: "Session's start time" })
  @Column({ type: DataType.TIME })
  session_start: string;

  @ApiProperty({ example: '16:00', description: "Session's end time" })
  @Column({ type: DataType.TIME })
  session_end: string;

  @ApiProperty({
    example: '400',
    description: "Session's number of available seats",
  })
  @Column({ type: DataType.INTEGER })
  available_seats: number;

  @ForeignKey(() => CinemaHall)
  @Column({ type: DataType.INTEGER })
  cinema_hall_id: number;

  @ForeignKey(() => Movies)
  @Column({ type: DataType.INTEGER })
  movie_id: number;

  @ApiProperty({ example: '3D_MAX_Poltava', description: 'Cinema hall' })
  @BelongsTo(() => CinemaHall)
  cinema_hall: CinemaHall;

  @ApiProperty({ example: 'Movie name', description: 'Movie name' })
  @BelongsTo(() => Movies)
  movie: Movies;
}
