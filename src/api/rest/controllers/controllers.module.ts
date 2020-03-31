import { Module } from '@nestjs/common';
import { ItemsController } from 'api/rest/controllers/items.controller';
import { LoggerModule } from 'utils/logger.module';
import { ServicesModule } from 'services/services.module';
import { AuthController } from './auth.controller';
import { AuthModule } from 'services/auth/auth.module';

@Module({
  imports: [LoggerModule, ServicesModule, AuthModule],
  controllers: [ItemsController, AuthController],
  providers: [],
})
export class ControllersModule {}
