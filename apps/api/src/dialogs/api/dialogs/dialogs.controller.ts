import { AccessJwtAuthGuard } from '@auth/security/guards';
import { AccessPayloadRequest } from '@common/types';
import { toObjectId } from '@common/utils';
import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogsService } from '@dialogs/application/services';
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

    return this.dialogsService.findPrivateDialogs(userObjectId);
  }

  @Post('private')
  @UseGuards(AccessJwtAuthGuard)
  create(
    @Req() accessPayloadRequest: AccessPayloadRequest,
    @Body() createDialog: CreateDialog,
  ) {
    const creatorId = accessPayloadRequest.user.userId;

    const participantIds = new Set<string>([
      creatorId,
      ...createDialog.participantIds,
    ]);

    const createDialogCommand: CreateDialogCommand = {
      participantIds: Array.from(participantIds).map(toObjectId),
      type: createDialog.type,
      title: createDialog.title,
    };

    return this.dialogsService.createPrivateDialog(createDialogCommand);
  }
}
