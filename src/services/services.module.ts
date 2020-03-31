import { ItemsService } from './items.service';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'utils/logger.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from 'repositories/repositories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LoggerModule, ConfigModule, RepositoriesModule, AuthModule],
  providers: [ItemsService],
  exports: [ItemsService],
})

export class ServicesModule {}
