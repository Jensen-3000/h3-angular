import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginResponse, UserInfo, Role } from './auth.interface';
import { tap } from 'rxjs';
import { JwtDecoderService } from '../token/jwt-decoder.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/auth/login`;

  // Who needs Angular DI when you have the `inject` function?
  private http = inject(HttpClient);
  private tokenStorage = inject(TokenService);
  private jwtDecoder = inject(JwtDecoderService);

  // Computed: A signal that automatically updates its value when its dependencies change,
  // similar to a C# property with change notification (e.g., INotifyPropertyChanged).
  private decodedToken = computed(() => this.jwtDecoder.decodeToken(this.tokenStorage.getToken()));
  user = computed<UserInfo | null>(() => this.jwtDecoder.getUserInfo(this.decodedToken()));
  isLoggedIn = computed(() => !!this.tokenStorage.getToken());

  username = computed<string | undefined>(() => this.user()?.username);
  userRole = computed<string | undefined>(() => this.user()?.role);

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(this.apiUrl, { username, password })
      .pipe(tap((response) => this.tokenStorage.setToken(response.token)));
  }

  logout(): void {
    this.tokenStorage.clearToken();
  }

  hasRequiredRole(requiredRoles: Role[]): boolean {
    if (!requiredRoles?.length) {
      return true;
    }

    const userRole = this.userRole();
    if (!userRole) {
      return false;
    }

    return requiredRoles.some((role) => role.toLowerCase() === userRole.toLowerCase());
  }
}
