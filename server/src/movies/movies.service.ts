import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string) {
    const movie = this.movies.find((movie) => movie.id === parseInt(id))
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} not found`)
    }
    return movie
  }

  create(data) {
    this.movies.push({
        id: this.movies.length + 1,
        ...data
    })
  }

  delete(id: string) {
    this.getOne(id)
    this.movies.filter((movie) => movie.id !== parseInt(id))
  }
}
