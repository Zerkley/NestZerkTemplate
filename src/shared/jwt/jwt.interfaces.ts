export interface JwtOutput {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  password: string;
}
