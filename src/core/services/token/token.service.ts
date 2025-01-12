import { Injectable, signal } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  getToken(): string | null {
    return this.token();
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.token.set(token);
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
  }
}
