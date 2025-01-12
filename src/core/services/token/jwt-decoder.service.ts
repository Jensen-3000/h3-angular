import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, UserInfo } from '../auth/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  decodeToken(token: string | null): DecodedToken | null {
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserInfo(decoded: DecodedToken | null): UserInfo | null {
    return decoded ? { role: decoded.role || '', username: decoded.sub || '' } : null;
  }
}
