import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../database/user.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(':id')
  getUser(@Param('id') id: string): Observable<Partial<User>> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delUser(@Param('id') id: string): Observable<Partial<User>> {
    return this.userService.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    return this.userService.update(id, body);
  }
}
