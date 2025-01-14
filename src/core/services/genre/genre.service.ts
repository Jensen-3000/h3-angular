import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../enums/endpoints.enum';
import { GenreSimple } from '../../models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService extends CrudService<GenreSimple> {
  constructor() {
    super(Endpoints.Genres);
  }
}
