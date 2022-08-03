import { Controller, Param, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../database/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':id')
  getUser(@Param('id') id: string): Observable<Partial<User>> {
    return this.userService.findById(id);
  }
}
