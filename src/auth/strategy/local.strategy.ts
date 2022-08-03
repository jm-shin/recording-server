import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserPrincipal } from '../interface/user-principal.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(id: string, password: string): Promise<UserPrincipal> {
    const user: UserPrincipal = await lastValueFrom(
      this.authService.validateUser(id, password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
