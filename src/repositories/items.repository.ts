import { ItemDtoUpdate } from '../model/item';
import { Injectable } from '@nestjs/common';
import { ItemDto } from 'model/item';

@Injectable()
export class ItemsRepository {
  async addItem(itemDto: ItemDto): Promise<ItemDto> {
    return;
  }

  async update(itemId: string, itemDto: ItemDtoUpdate): Promise<ItemDto> {
    return;
  }

  async getItemById(itemId: string): Promise<ItemDto> {
    return;
  }

  async getItemByFilter(filter: string, offset: number, limit: number): Promise<ItemDto[]> {
    return;
  }

  async delete(itemId: string): Promise<number> {
    return;
  }

  async deleteAll(): Promise<number> {
    return;
  }
}
