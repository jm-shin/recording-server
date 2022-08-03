import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MODEL } from '../database/database.constants';
import { EMPTY, from, map, mergeMap, Observable, of } from 'rxjs';
import { User, UserModel } from '../database/user.model';
import { RegisterDto } from './dto/register.dto';
import { throwIfEmpty } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private userModel: UserModel) {
  }

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }).exec());
  }

  existsByUsername(username: string): Observable<boolean> {
    return from(this.userModel.exists({ username }).exec()).pipe(
      map((exists) => exists != null),
    );
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }).exec()).pipe(
      map((exists) => exists != null),
    );
  }

  register(data: RegisterDto): Observable<User> {
    const created = this.userModel.create({
      ...data,
    });
    return from(created);
  }

  findById(id: string): Observable<User> {
    const userQuery = this.userModel.findOne({ _id: id });
    return from(userQuery.exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user: ${id} was not found`)),
    );
  }
}
