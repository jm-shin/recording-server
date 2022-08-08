import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MODEL, USER_REPOSITORY } from '../database/database.constants';
import { EMPTY, from, map, mergeMap, Observable, of } from 'rxjs';
import { User, UserModel } from '../database/user.model';
import { RegisterDto } from './dto/register.dto';
import { throwIfEmpty } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private userModel: UserModel,
    @Inject(USER_REPOSITORY) private userRepository: Repository<UserEntity>,
  ) {}

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }).exec());
  }

  existsById(id: string): Observable<boolean> {
    return from(this.userModel.exists({ id }).exec()).pipe(
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
      mergeMap((user) => (user ? of(user) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user: ${id} was not found`)),
    );
  }

  deleteById(id: string): Observable<any> {
    return from(this.userModel.deleteOne({ id: id })).pipe(
      mergeMap((user) => (user ? of(user) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user: ${id} was not found`)),
    );
  }

  update(id: string, data): Observable<User> {
    return from(
      this.userModel
        .findOneAndUpdate({ id: id }, { ...data }, { new: true })
        .exec(),
    ).pipe(
      mergeMap((user) => (user ? of(user) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`user: ${id} was not found`)),
    );
  }

  //mysql
  async registerUser(data: RegisterDto) {
    const registerUser = await UserEntity.create(data);
    return this.userRepository.save(registerUser);
  }
}
