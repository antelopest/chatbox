import { AccessJwtAuthGuard } from '@auth/security/guards';
import { AccessPayloadRequest } from '@common/types';
import { toObjectId } from '@common/utils';
import { CreateDialogCommand } from '@dialogs/commands';
import { DialogsService } from '@dialogs/services';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateDialog } from '@packages/contracts';

@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard)
  findDialogs(@Req() accessPayloadRequest: AccessPayloadRequest) {
    const userId = accessPayloadRequest.user.userId;
    const userObjectId = toObjectId(userId);

    return this.dialogsService.findDialogs(userObjectId);
  }

  @Post()
  @UseGuards(AccessJwtAuthGuard)
  create(@Body() createDialog: CreateDialog) {
    const createDialogCommand: CreateDialogCommand = {
      participantIds: createDialog.participantIds.map(toObjectId),
      type: createDialog.type,
      title: createDialog.title,
    };

    return this.dialogsService.create(createDialogCommand);
  }
}
