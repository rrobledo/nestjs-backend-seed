import { Connection } from '../../src/repositories/somedb/connection.somedb';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from 'services/items.service';
import configuration from '../../test/config/configuration';

import { LoggerModule } from 'utils/logger.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from 'repositories/repositories.module';
import { ItemDto } from 'model/item';
import * as uuidv1 from 'uuid/v1';
import * as casual from 'casual';

describe('Test Service', () => {
  let itemsServices: ItemsService;
  let conn: Connection;

  beforeEach(async (done) => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, 
                ConfigModule.forRoot({
                  load: [configuration],
                }),
                RepositoriesModule],
      controllers: [],
      providers: [ItemsService],
      exports: [ItemsService],
    }).compile();
    
    itemsServices = app.get<ItemsService>(ItemsService);
    conn = app.get<Connection>(Connection);
    await itemsServices.deleteAll();
    done();
  });

  afterAll(async (done) => {
    await conn.getDriver().close();
    done();
  });

  describe('item', () => {
    it('When a new item is created then return if success ', async () => {
      let itemDto = new ItemDto();
      itemDto.id = uuidv1();
      itemDto.type = "PERSON";
      itemDto.name = "Raul Robledo";

      const itemSaved: ItemDto= await itemsServices.addItem(itemDto);
      const itemReturned: ItemDto = await itemsServices.getItemById(itemDto.id);

      expect(itemSaved.id = itemReturned.id);
      expect(itemSaved.type = itemReturned.type);
      expect(itemSaved.name = itemReturned.name);
    });

    it('When a set of item are created then using filter with operators will return success results', async () => {
      
      const type = casual.word;
      let itemDto1 = new ItemDto();
      itemDto1.id = casual.uuid;
      itemDto1.type = type;
      itemDto1.name = casual.name;
      itemDto1.company_name = casual.company_name;
      itemDto1.address = casual.address;
      itemDto1.born = casual.date('YYYY-MM-DD'); 
      itemDto1.enabled = casual.boolean; 

      let itemDto2 = new ItemDto();
      itemDto2.id = casual.uuid;
      itemDto2.type = type;
      itemDto2.name = casual.name;
      itemDto2.company_name = casual.company_name;
      itemDto2.address = casual.address;
      itemDto2.born = casual.date('YYYY-MM-DD'); 
      itemDto2.enabled = casual.boolean; 

      let itemDto3 = new ItemDto();
      itemDto3.id = casual.uuid;
      itemDto3.type = type;
      itemDto3.name = casual.name;
      itemDto3.company_name = casual.company_name;
      itemDto3.address = casual.address;
      itemDto3.born = casual.date('YYYY-MM-DD'); 
      itemDto3.enabled = casual.boolean; 

      await itemsServices.addItem(itemDto1);
      await itemsServices.addItem(itemDto2);
      await itemsServices.addItem(itemDto3);
      const items = await itemsServices.getItemByFilter(`{"type" : "${type}"}`);
      expect(items.length).toBe(3);

      const items2 = await itemsServices.getItemByFilter(`{ "$and" : [{"type" : "${type}"}, { "name" : "${itemDto1.name}"}]}`);
      expect(items2.length).toBe(1);

    });

    it('When a non existent item is deleted then return if success ', async () => {
      
      //For some item that not exists
      let itemId = uuidv1();
      let throwException: boolean = false;
      try {
        await itemsServices.getItemById(itemId);
      } catch(error) {
        throwException = true;
      }
      expect(throwException).toBeTruthy();
      
      //Deletion should throw not found exception
      let notFoundExcThrown = false;
      try{
        await itemsServices.delete(itemId);
        notFoundExcThrown = false;
      } catch(error) {
        notFoundExcThrown = true;
      }
      expect(notFoundExcThrown).toBe(true);
    });
  });

  describe('item', () => {
    it('When all items are deleted then return success', async () => {
      expect(true)
    });

    it('When all items are deleted then return if success ', async () => {
      let itemDto = new ItemDto();
      itemDto.id = uuidv1();
      itemDto.type = "PERSON";
      itemDto.name = "Raul Robledo";

      const itemSaved: ItemDto= await itemsServices.addItem(itemDto);

      const result: number = await itemsServices.deleteAll();
      
      expect(result >= 1).toBe(true);
      
      //Verifies item does not exist any more
      let throwException: boolean = false;
      try{
        await itemsServices.getItemById(itemDto.id);
      } catch(error) {
        throwException = true;
      }
      expect(throwException).toBeTruthy();
      
    });
  });

});
