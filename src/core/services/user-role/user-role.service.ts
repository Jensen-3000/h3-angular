import { Injectable } from '@angular/core';
import { Endpoints } from '../../enums/endpoints.enum';
import { UserRole } from '../../models/user-role.model';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends CrudService<UserRole> {
  constructor() {
    super(Endpoints.UserRoles);
  }
}
