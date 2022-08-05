import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { map, mergeMap, Observable } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  //mongodb version
  @Post()
  register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Observable<Response> {
    const id = registerDto.id;
    return this.userService.existsById(id).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`id: ${id} is existed`);
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

  //mysql version
  @Post('user')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.userService.registerUSer(registerDto);
  }
}
