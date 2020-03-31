import { ItemDtoUpdate } from '../../model/item';
import { Connection } from './connection.somedb';
import { LoggerService } from 'nest-logger';
import { ConfigService } from '@nestjs/config';
import { ItemsRepository } from 'repositories/items.repository';
import { Injectable } from '@nestjs/common';
import { ItemDto } from 'model/item';


@Injectable()
export class ItemsRepositoryNeo4j extends ItemsRepository {
  private session = null;

  constructor(private readonly config: ConfigService,
              private readonly logger: LoggerService,
              private readonly conn: Connection) {
    super();
    this.session = conn.getSession();
  }

  async additem(itemDto: ItemDto): Promise<ItemDto> {
    return Promise.resolve(itemDto);
  }

  async getItemById(itemId: string): Promise<ItemDto> {
    return Promise.resolve(null);
  }

  async getItemByFilter(filter: string, offset: number, limit: number): Promise<ItemDto[]> {
    return Promise.resolve([]);
  }

  async update(itemId: string, itemDto: ItemDtoUpdate): Promise<ItemDto> {
    return Promise.resolve(null);
  }

  async delete(itemId: string): Promise<number> {
    return Promise.resolve(1);
  }

  async deleteAll(): Promise<number> {
    return Promise.resolve(1);
  }
}
