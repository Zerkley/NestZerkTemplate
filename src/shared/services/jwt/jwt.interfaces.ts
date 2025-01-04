export interface JwtOutput {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  password: string;
}

export interface LoginOutput {
  tokens: JwtOutput;
  _id: string;
}
