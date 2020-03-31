import { IsDefined } from 'class-validator';

export class ItemDto {
    @IsDefined()
    id: string;

    @IsDefined()
    type: string;

    [key: string]: any
}

export class ItemDtoUpdate {
    [key: string]: any
}
