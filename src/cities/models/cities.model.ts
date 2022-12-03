import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cinema } from 'src/cinemas/models/cinemas.model';
import { ActorsMovies } from 'src/movies/models/actors-movies.model';
import { Movies } from 'src/movies/models/movies.model';

interface CityCreationAttrs {
  name: string;
}

@Table({
  tableName: 'cities',
  createdAt: false,
  updatedAt: false,
})
export class City extends Model<City, CityCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Cinemas uniq identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  city_id: number;

  @ApiProperty({ example: 'Poltava', description: 'City name' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @HasMany(() => Cinema)
  cinemas: Cinema[];
}
