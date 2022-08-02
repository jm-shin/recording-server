import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from '../database/database.constants';
import { from, map, Observable } from 'rxjs';
import { User, UserModel } from '../database/user.model';
import { exists } from 'fs';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private userModel: UserModel) {}

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }).exec());
  }
}
