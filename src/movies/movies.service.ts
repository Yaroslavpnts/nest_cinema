import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actors } from 'src/actors/models/actors.model';
import { Directors } from 'src/directors/models/director.model';
import { Session } from 'src/sessions/models/sessions.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorsMovies } from './models/actors-movies.model';
import { CategoriesMovies } from './models/categories-movies.model';
import { Category } from './models/category.model';
import { DirectorsMovies } from './models/directors-movies.model';
import { Movies } from './models/movies.model';

import { Op } from 'sequelize';
import sequelize from 'sequelize';

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
        { model: Session },
      ],
    });

    return result;
  }

  async getOneFilm(id: number) {
    const result = await this.moviesRepository.findOne({
      where: {
        id,
      },
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
        { model: Session },
      ],
    });
    return result;
  }

  async updateMovie(dto: CreateMovieDto) {
    await this.moviesRepository.update(
      {
        name: dto.name,
        description: dto.description,
        rating: dto.rating,
        imdb_rating: dto.imdb_rating,
        poster_src: dto.poster_src,
        wide_poster_src: dto.wide_poster_src,
        production_year: dto.production_year,
      },
      {
        where: {
          id: dto.id,
        },
      },
    );
    const movie = await this.moviesRepository.findOne({
      where: {
        id: dto.id,
      },
    });
    if (dto.directors?.length) {
      movie.$set('directors', dto.directors);
    }
    if (dto.genres?.length) {
      movie.$set('genres', dto.genres);
    }
    if (dto.actors?.length) {
      movie.$set('actors', dto.actors);
    }
  }

  async addMovie(dto: CreateMovieDto) {
    const movie = await this.moviesRepository.create({
      name: dto.name,
      description: dto.description,
      rating: dto.rating,
      imdb_rating: dto.imdb_rating,
      poster_src: dto.poster_src,
      production_year: dto.production_year,
      start_date_session: dto.start_date_session,
      end_date_session: dto.end_date_session,
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

  async getAllMoviesWithSessionsByDateAndByCinemaHalls(
    dateStart: string,
    dateEnd: string,
    cinemaHalls: string,
  ) {
    const halls = cinemaHalls.split(',').map((hall) => Number(hall));

    const dateMax = new Date(dateEnd);
    const dateMin = new Date(dateStart);

    const result = await this.moviesRepository.findAll({
      include: {
        model: Session,
        required: true,
        where: {
          date: {
            [Op.lte]: dateMax.setMinutes(dateMax.getMinutes() + 1),

            [Op.gte]: dateMin.setMinutes(dateMin.getMinutes() - 1),
          },
          cinema_hall_id: { [Op.in]: halls },
        },
      },
      // order: [[Session, 'session_start', 'ASC']],
    });

    return result;
  }

  async getMoviesBySearch(search: string) {
    const movies = await this.moviesRepository.findAll({
      limit: 7,
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        '%' + search.toLowerCase() + '%',
      ),
    });

    return movies;
  }
}
