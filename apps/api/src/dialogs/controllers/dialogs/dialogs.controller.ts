import { DialogsService } from '@dialogs/services';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get()
  getDialogs() {}

  @Post('private')
  createPrivate() {}
}
