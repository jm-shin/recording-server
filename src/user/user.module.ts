import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { RegisterController } from './register.controller';
import { userProviders } from '../database/user/user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [UserController, RegisterController],
})
export class UserModule {}
