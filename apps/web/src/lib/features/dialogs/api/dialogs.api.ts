import type {
  CreateDialog,
  DialogResponse,
  DialogsResponse,
} from '@packages/contracts';

import { DIALOGS_ROUTES } from './dialogs.routes';

import { http } from '$lib/common';

export const dialogsApi = {
  list() {
    return http<DialogsResponse>(DIALOGS_ROUTES.dialogs, {
      method: 'GET',
    });
  },
  createPrivate(participants: string[], title?: string) {
    const payload: CreateDialog = {
      participants,
      type: 'private',
      title,
    };

    return http<DialogResponse>(DIALOGS_ROUTES.createPrivateDialog, {
      method: 'POST',
      body: payload,
    });
  },
};
