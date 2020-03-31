import { ControllersModule } from 'api/rest/controllers/controllers.module';
import { Module } from '@nestjs/common';
import configuration from 'config/configuration';

import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'utils/logger.module';

@Module({
  imports: [LoggerModule,
            ControllersModule,
            ConfigModule.forRoot({
                                    load: [configuration],
                                })],
})
export class AppModule {}
