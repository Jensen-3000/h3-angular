import { Injectable } from '@angular/core';
import { CrudService } from './crud/crud.service';
import { Endpoints } from '../models/endpoints.enum';
import { UserRole } from '../models/user-role.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends CrudService<UserRole> {
  constructor() {
    super(Endpoints.UserRoles);
  }
}
