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
    const result = await this.categoryRepository.findAll();

    return result;
  }

  async createCategory(dto: CreateCategoryDto) {
    const result = await this.categoryRepository.create(dto);
    return result;
  }

  async getMoviesPagination(page: string, size: string) {
    const pageAsNumber = Number.parseInt(page);
    const sizeAsNumber = Number.parseInt(size);

    let currentPage = 0;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) {
      currentPage = pageAsNumber;
    }

    let currentSize = 10;

    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
      currentSize = sizeAsNumber;
    }

    const result = await this.moviesRepository.findAndCountAll({
      limit: +currentSize,
      offset: +currentPage * +currentSize,
      distinct: true,
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

    return {
      content: result.rows,
      totalPages: Math.ceil(result.count / currentSize),
      totalCount: result.count,
    };
  }

  async getAllMovies() {
    const movies = await this.moviesRepository.findAll({
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
    return movies;
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
      wide_poster_src: dto.wide_poster_src,
      production_year: dto.production_year,
      start_date_session: dto.start_date_session,
      end_date_session: dto.end_date_session,
      duration: dto.duration,
    });

    await Promise.all(
      dto.actors.map((id) => {
        return this.actorMovieRepository.create({
          filmId: movie.id,
          actorId: id,
        });
      }),
    );

    await Promise.all(
      dto.directors.map((id) => {
        return this.dirMovieRepository.create({
          filmId: movie.id,
          directorId: id,
        });
      }),
    );

    await Promise.all(
      dto.genres.map((id) => {
        return this.categMovieRepository.create({
          filmId: movie.id,
          categoryId: id,
        });
      }),
    );

    return await this.getOneFilm(movie.id);
  }

  async removeMovie(id: number) {
    const result = await this.moviesRepository.destroy({ where: { id } });
    return result;
  }

  async getAllMoviesByFilters(
    dateStart: string,
    dateEnd: string,
    cinemaHalls?: string,
  ) {
    const dateMin = new Date(dateStart);
    const dateMax = new Date(dateEnd);

    if (cinemaHalls) {
      const halls = cinemaHalls.split(',').map((hall) => Number(hall));

      return await this.getAllMoviesWithSessionsByDateAndByCinemaHalls(
        dateMin,
        dateMax,
        halls,
      );
    } else {
      return await this.getAllMoviesWithSessionsByDate(dateMin, dateMax);
    }
  }

  async getAllMoviesWithSessionsByDateAndByCinemaHalls(
    dateMin: Date,
    dateMax: Date,
    cinemaHalls: number[],
  ) {
    return await this.moviesRepository.findAll({
      include: {
        model: Session,
        required: true,
        where: {
          date: {
            [Op.lte]: dateMax.setMinutes(dateMax.getMinutes() + 1),

            [Op.gte]: dateMin.setMinutes(dateMin.getMinutes() - 1),
          },
          cinema_hall_id: { [Op.in]: cinemaHalls },
        },
      },
      // order: [[Session, 'session_start', 'ASC']],
    });
  }

  async getAllMoviesWithSessionsByDate(dateMin: Date, dateMax: Date) {
    const result = await this.moviesRepository.findAll({
      include: [
        {
          model: Session,
          required: true,
          where: {
            date: {
              [Op.lte]: dateMax.setMinutes(dateMax.getMinutes() + 1),

              [Op.gte]: dateMin.setMinutes(dateMin.getMinutes() - 1),
            },
          },
        },
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
