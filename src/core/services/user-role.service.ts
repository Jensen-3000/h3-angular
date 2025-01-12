import { Injectable } from '@angular/core';
import { CrudService } from './crud/crud.service';
import { Endpoints } from '../models/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends CrudService {
  constructor() {
    super(Endpoints.UserRoles);
  }
}
