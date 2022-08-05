import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongodbConfig from '../config/mongodb.config';
import { databaseModelsProviders } from './database-models.providers';
import { databaseConnectionProviders } from './database-connection.providers';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [
    ...databaseConnectionProviders,
    ...databaseModelsProviders,
    ...databaseProviders,
  ],
  exports: [
    ...databaseConnectionProviders,
    ...databaseModelsProviders,
    ...databaseProviders,
  ],
})
export class DatabaseModule {}
