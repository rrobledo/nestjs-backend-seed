import { Connection } from './somedb/connection.somedb';
import { SomeDBModule } from './somedb/somedb.module';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'utils/logger.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'nest-logger';

import { ItemsRepository } from './items.repository';
import { ItemsRepositoryNeo4j } from './somedb/items.neo4j';

@Module({
  imports: [LoggerModule, ConfigModule, SomeDBModule],
  providers: [{
    provide: ItemsRepository,
    useFactory: (config: ConfigService, logger: LoggerService, conn: Connection) => {
      return new ItemsRepositoryNeo4j(config, logger, conn);
    },
    inject: [ConfigService, LoggerService, Connection],
  },
  Connection],
  exports: [ItemsRepository, Connection],
})

export class RepositoriesModule {}
