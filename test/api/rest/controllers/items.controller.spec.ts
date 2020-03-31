import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from 'api/rest/controllers/items.controller';
import { LoggerModule } from 'utils/logger.module';
import { ServicesModule } from 'services/services.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../config/configuration';

describe('AppController', () => {
  let itemsController: ItemsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, 
                ConfigModule.forRoot({
                  load: [configuration],
                }),
        ServicesModule],
      controllers: [ItemsController],
      providers: [],
    }).compile();

    itemsController = app.get<ItemsController>(ItemsController);
  });

  describe('root', () => {
    it('should create a item and return success', () => {
      expect(true);
    });
  });
});
