import { DialogsService } from '@dialogs/services';
import { Controller } from '@nestjs/common';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}
}
