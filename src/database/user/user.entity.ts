import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { RegisterDto } from '../../user/dto/register.dto';
import { hash } from 'bcrypt';

@Entity('user')
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

  static async create(data: RegisterDto) {
    const user = new UserEntity();
    user.id = data.id;
    user.password = await hash(data.password, 12);
    user.username = data.username;
    user.email = data.email;
    return user;
  }
}
