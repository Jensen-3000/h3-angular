import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../enums/endpoints.enum';
import { Observable } from 'rxjs';
import { MovieCreate, MovieDetailed, MovieSimple, MovieUpdate } from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CrudService<MovieSimple> {
  constructor() {
    super(Endpoints.Movies);
  }

  getBySlug(slug: string): Observable<MovieDetailed> {
    return this.http.get<MovieDetailed>(`${this.baseUrl}/${this.endpoint}/${slug}`);
  }

  getDetailedById(id: string): Observable<MovieDetailed> {
    return this.http.get<MovieDetailed>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  createMovie(movie: MovieCreate): Observable<MovieSimple> {
    return this.http.post<MovieSimple>(`${this.baseUrl}/${this.endpoint}`, movie);
  }

  updateMovie(id: number, movie: MovieUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${this.endpoint}/${id}`, movie);
  }
}
