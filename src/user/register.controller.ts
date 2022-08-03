import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { map, mergeMap, Observable } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Observable<Response> {
    const username = registerDto.username;
    return this.userService.existsByUsername(username).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`username: ${username} is existed`);
        } else {
          const email = registerDto.email;
          return this.userService.existsByEmail(email).pipe(
            mergeMap((exists) => {
              if (exists) {
                throw new ConflictException(`email: ${email} is existed`);
              } else {
                return this.userService.register(registerDto).pipe(
                  map((user) =>
                    res
                      .location('/users/' + user.id)
                      .status(201)
                      .end(),
                  ),
                );
              }
            }),
          );
        }
      }),
    );
  }
}
