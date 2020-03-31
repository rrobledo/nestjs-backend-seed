import { ItemDtoUpdate } from '../model/item';
import { LoggerService } from 'nest-logger';
import { ConfigService } from '@nestjs/config';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ItemDto } from 'model/item';
import { ItemsRepository } from 'repositories/items.repository';

@Injectable()
export class ItemsService {

  constructor(private readonly logger: LoggerService,
              private readonly config: ConfigService,
              private readonly repo: ItemsRepository) {
  }

  async addItem(itemDto: ItemDto) {
    return this.repo.addItem(itemDto);
  }

  async getItemById(itemId: string): Promise<ItemDto> {
    const itemDto = await this.repo.getItemById(itemId);
    if (!itemDto) {
      this.logger.debug(`item with id: ${itemId} not found.`);
      throw new NotFoundException(`item with id: ${itemId} not found.`);
    }
    return Promise.resolve(itemDto);
  }

  async getItemByFilter(filter: string, offset: number = 0, limit: number = 50): Promise<ItemDto[]> {
    return this.repo.getItemByFilter(filter, offset, limit);
  }

  async delete(itemId: string): Promise<void> {
    const count = await this.repo.delete(itemId);
    if (count < 1) {
      throw new NotFoundException(`item with id: ${itemId} not found.`);
    }
    return Promise.resolve();
  }

  async updateItem(itemId: string, itemDto: ItemDtoUpdate) {
    const item = await this.repo.getItemById(itemId);
    if (!item) {
      this.logger.debug(`item with id: ${itemDto.id} don't exists.`);
      throw new ConflictException(`item with id: ${itemDto.id} don't exists.`);
    }
    if (itemDto.id) {
      this.logger.debug(`The item id: ${itemDto.id} couldn't be changed.`);
      throw new ConflictException(`The item id: ${itemDto.id} couldn't be changed.`);
    }
    this.logger.debug('service updateitem called');
    itemDto.id = item.id;
    itemDto.type = item.type;
    return this.repo.update(itemId, itemDto);
  }

  // Deletes all nodes and relationships
  async deleteAll(): Promise<number> {
    return this.repo.deleteAll();
  }

}
