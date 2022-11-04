import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actors } from 'src/actors/models/actors.model';
import { Directors } from 'src/directors/models/director.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorsMovies } from './models/actors-movies.model';
import { CategoriesMovies } from './models/categories-movies.model';
import { Category } from './models/category.model';
import { DirectorsMovies } from './models/directors-movies.model';
import { Movies } from './models/movies.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(Movies) private moviesRepository: typeof Movies,
    @InjectModel(DirectorsMovies)
    private dirMovieRepository: typeof DirectorsMovies,
    @InjectModel(ActorsMovies)
    private actorMovieRepository: typeof ActorsMovies,
    @InjectModel(CategoriesMovies)
    private categMovieRepository: typeof CategoriesMovies,
  ) {}

  async getAllCategories() {
    console.log(2222);
    const result = await this.categoryRepository.findAll();
    console.log(3333, result);

    return result;
  }

  async createCategory(dto: CreateCategoryDto) {
    const result = await this.categoryRepository.create(dto);
    return result;
  }

  async getAllFilms() {
    const result = await this.moviesRepository.findAll({
      include: [
        {
          model: Actors,
          through: { attributes: [] },
        },
        {
          model: Directors,
          through: { attributes: [] },
        },
        {
          model: Category,
          through: { attributes: [] },
        },
      ],
    });
    return result;
  }

  async addMovie(dto: CreateMovieDto) {
    const movie = await this.moviesRepository.create({
      name: dto.name,
      description: dto.description,
      rating: dto.rating,
      imdb_rating: dto.imdb_rating,
      poster_src: dto.poster_src,
    });
    if (dto.directors.length) {
      await dto.directors.forEach(async (id) => {
        await this.dirMovieRepository.create({
          filmId: movie.id,
          directorId: id,
        });
      });
    }
    if (dto.genres.length) {
      await dto.genres.forEach(async (id) => {
        await this.categMovieRepository.create({
          filmId: movie.id,
          categoryId: id,
        });
      });
    }
    if (dto.actors.length) {
      await dto.actors.forEach(async (id) => {
        await this.actorMovieRepository.create({
          filmId: movie.id,
          actorId: id,
        });
      });
    }
    return movie;
  }

  async removeMovie(id: number) {
    const result = await this.moviesRepository.destroy({ where: { id } });
    return result;
  }
}
