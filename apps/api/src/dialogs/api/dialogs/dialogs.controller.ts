import { AccessJwtAuthGuard } from '@auth/security/guards';
import { ZodValidationPipe } from '@common/pipes';
import { AccessPayloadRequest } from '@common/types';
import { toObjectId } from '@common/utils';
import { CreateDialogCommand } from '@dialogs/application/commands';
import { DialogsService } from '@dialogs/application/services';
import { DialogsReadService } from '@dialogs/read-models/services/dialogs-read/dialogs-read.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateDialog } from '@packages/contracts';
import { CreateDialogSchema } from '@packages/validators';

@Controller('dialogs')
@UseGuards(AccessJwtAuthGuard)
export class DialogsController {
  constructor(
    private readonly dialogsService: DialogsService,
    private readonly dialogsReadService: DialogsReadService,
  ) {}

  @Get()
  findDialogs(@Req() accessPayloadRequest: AccessPayloadRequest) {
    const userId = accessPayloadRequest.user.userId;
    const userObjectId = toObjectId(userId);

    return this.dialogsReadService.findPrivateDialogsByUserId(userObjectId);
  }

  @Post('private')
  @UsePipes(new ZodValidationPipe(CreateDialogSchema))
  create(
    @Req() accessPayloadRequest: AccessPayloadRequest,
    @Body() createDialog: CreateDialog,
  ) {
    const creatorId = accessPayloadRequest.user.userId;

    const participants = new Set<string>([
      creatorId,
      ...createDialog.participants,
    ]);

    const createDialogCommand: CreateDialogCommand = {
      participants: Array.from(participants).map(toObjectId),
      type: createDialog.type,
      title: createDialog.title,
    };

    return this.dialogsService.createPrivateDialog(createDialogCommand);
  }
}
