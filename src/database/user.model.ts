import { compare, hash } from 'bcrypt';
import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { from, Observable } from 'rxjs';

interface User extends Document {
  comparePassword(password: string): Observable<boolean>;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>({
  id: SchemaTypes.String,
  password: SchemaTypes.String,
  username: SchemaTypes.String,
  email: SchemaTypes.String,
});

async function preSaveHook(next) {
  if (!this.isModified('password')) return next();
  const password = await hash(this.password, 12);
  this.set('password', password);
  next();
}

UserSchema.pre<User>('save', preSaveHook);

function comparePasswordMethod(password: string): Observable<boolean> {
  return from(compare(password, this.password));
}

UserSchema.methods.comparePassword = comparePasswordMethod;

const createUserModel: (conn: Connection) => UserModel = (conn: Connection) =>
  conn.model<User>('User', UserSchema, 'users');

export { User, UserModel, createUserModel, comparePasswordMethod };
