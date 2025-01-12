import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../models/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends CrudService {
  constructor() {
    super(Endpoints.Movies);
  }
}
