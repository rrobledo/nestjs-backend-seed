import { ItemDtoUpdate } from '../../../model/item';
import { Controller, Get, Post, Put, Body, Query, Delete, HttpCode, Param, Header } from '@nestjs/common';
import { ItemDto } from 'model/item';

import { ItemsService } from 'services/items.service';
import { LoggerService } from 'nest-logger';

@Controller()
export class ItemsController {
  constructor(private readonly logger: LoggerService,
              private readonly itemsService: ItemsService) {}

  @Post('/items')
  async create(@Body() itemDto: ItemDto) {
    const itemSaved = await this.itemsService.addItem(itemDto);
    this.logger.debug('new item created');
    return itemSaved;
  }

  @Get('/items/:id')
  @HttpCode(204)
  async getItemById(@Param('id') itemId = '-1') {
    return await this.itemsService.getItemById(itemId);
  }

  @Get('/items')
  async getByFilter(@Query('filter') filter = '{}', @Query('offset') offset = 0, @Query('limit') limit = 10) {
    const offsetParm = offset;
    const limitParm = limit;
    const items = await this.itemsService.getItemByFilter(filter, offsetParm, limitParm);
    return {
      pagination: {
        offset: offsetParm,
        limit: limitParm,
        total: items.length,
      },
      data: items,
      links: {
        next: '',
        prev: '',
      },
    };
  }

  @Put('/items/:id')
  async update(@Param('id') id: string, @Body() itemDto: ItemDtoUpdate) {
    const itemSaved = await this.itemsService.updateItem(id, itemDto);
    this.logger.debug('item Updated');
    return itemSaved;
  }

  @Delete('/items/:id')
  @HttpCode(204)
  async delete(@Param('id') itemId = '-1') {
    await this.itemsService.delete(itemId);
    return;
  }
}
