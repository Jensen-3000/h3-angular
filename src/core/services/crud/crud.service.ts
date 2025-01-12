import { inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export class CrudService {
  protected http = inject(HttpClient);
  protected baseUrl = environment.apiBaseUrl;

  constructor(protected endpoint: string) {}

  protected getFullUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  getAll<T extends { id: number }>() {
    return this.http.get<T[]>(this.getFullUrl()).pipe(map((data) => signal(data)));
  }

  getById<T extends { id: number }>(id: number) {
    return this.http.get<T>(`${this.getFullUrl()}/${id}`).pipe(map((data) => signal(data)));
  }

  create<T extends { id: number }>(item: T) {
    return this.http.post<T>(this.getFullUrl(), item).pipe(map((data) => signal(data)));
  }

  update<T extends { id: number }>(id: number, item: T) {
    return this.http.put<void>(`${this.getFullUrl()}/${id}`, item).pipe(map(() => signal(undefined)));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.getFullUrl()}/${id}`).pipe(map(() => signal(undefined)));
  }
}
