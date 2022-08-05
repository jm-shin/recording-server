import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { RegisterDto } from '../../user/dto/register.dto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  email: string;

  static create(data: RegisterDto) {
    const user = new UserEntity();
    user.id = data.id;
    user.password = data.password;
    user.username = data.username;
    user.email = data.email;
    return user;
  }
}
