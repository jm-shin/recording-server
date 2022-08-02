export interface JwtPayload {
  readonly upn: string;
  readonly sub: string;
  readonly email: string;
}
