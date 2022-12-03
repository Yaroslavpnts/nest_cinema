import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CinemaHall } from 'src/cinema_halls/models/cinemas_hall.model';
import { City } from 'src/cities/models/cities.model';
import { ActorsMovies } from 'src/movies/models/actors-movies.model';
import { Movies } from 'src/movies/models/movies.model';

interface CinemaCreationAttrs {
  city: number;
  total_number_of_seats: number;
  adress: string;
}

@Table({
  tableName: 'cinemas',
  createdAt: false,
  updatedAt: false,
})
export class Cinema extends Model<Cinema, CinemaCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Cinemas uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  cinemas_id: number;

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER })
  city_id: number;

  @ApiProperty({ example: 'Poltava', description: 'City name' })
  @BelongsTo(() => City)
  city: City;

  @ApiProperty({ example: '1000', description: 'Total number of seats' })
  @Column({ type: DataType.INTEGER })
  total_number_of_seats: number;

  @ApiProperty({
    example: 'Poltava, Gogol street, 7',
    description: 'Cinema`s adress',
  })
  @Column({ type: DataType.STRING })
  adress: string;

  @ApiProperty({ example: 'USA', description: 'Actors photo link' })
  @HasMany(() => CinemaHall)
  cinema_halls: CinemaHall[];
}
