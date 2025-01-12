export interface UserInfo {
  role: string;
  username: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  role?: string;
  sub?: string;
  exp?: number;
  iat?: number;
}

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
