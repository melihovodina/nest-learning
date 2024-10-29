import { Controller, Get, Post, Param, Delete, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id)
  }

  @Post()
  create(@Body() data) {
    return this.moviesService.create(data)
  }
    
  @Delete('/:id')
  delete(@Param("id") id: string) {
    return this.moviesService.delete(id)
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() data) {
    return {
      updatedMovie: id, 
      ...data
    }
  }
}
