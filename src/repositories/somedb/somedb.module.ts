import { Connection } from './connection.somedb';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'utils/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [Connection],
  exports: [Connection],
})

export class SomeDBModule {}
