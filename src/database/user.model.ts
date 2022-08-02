import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { Observable } from 'rxjs';

interface User extends Document {
  comparePassword(password: string): Observable<boolean>;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>({
  username: SchemaTypes.String,
  password: SchemaTypes.String,
  email: SchemaTypes.String,
});

const createUserModel: (conn: Connection) => UserModel = (conn: Connection) =>
  conn.model<User>('User', UserSchema, 'users');

export { User, UserModel, createUserModel };
