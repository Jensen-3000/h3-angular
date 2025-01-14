import { GenreSimple } from './genre.model';
import { ScreeningSimple } from './screening.model';

export interface MovieSimple {
  id: number;
  title: string;
  imageUrl: string;
  duration: string;
}

export interface MovieDetailed extends MovieSimple {
  description: string;
  slug: string;
  genres: GenreSimple[];
  screenings: ScreeningSimple[];
}

export interface MovieCreate {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  duration: string;
  genreIds: number[];
}

export interface MovieUpdate {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  duration: string;
  genreIds: number[];
}
