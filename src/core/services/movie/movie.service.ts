import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../models/endpoints.enum';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CrudService<Movie> {
  constructor() {
    super(Endpoints.Movies);
  }

  getBySlug(slug: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${this.endpoint}/${slug}`);
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
