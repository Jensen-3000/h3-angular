import { inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../models/endpoints.enum';

export class CrudService<T> {
  protected baseUrl: string = environment.apiBaseUrl;
  http = inject(HttpClient);

  constructor(protected endpoint: Endpoints) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item);
  }

  update(id: number, item: T): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
