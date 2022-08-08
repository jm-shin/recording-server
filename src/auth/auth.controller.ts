import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';
import { AuthenticatedRequest } from './interface/authenticated-request.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Observable<Response> {
    return this.authService.login(req.user).pipe(
      map((token) => {
        return res
          .header('Authorization', 'Bearer' + token.access_token)
          .json(token)
          .send();
      }),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-user')
  loginUser() {
    return
  }
}
