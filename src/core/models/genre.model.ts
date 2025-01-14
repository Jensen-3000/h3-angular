import { MovieSimple } from './movie.model';

export interface GenreSimple {
  id: number;
  name: string;
}

export interface GenreDetailed extends GenreSimple {
  movies: MovieSimple[];
}
