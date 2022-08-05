import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { DATA_SOURCE, USER_REPOSITORY } from '../database.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
];
