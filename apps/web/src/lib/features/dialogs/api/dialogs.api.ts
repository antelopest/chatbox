import type {
  CreateDialog,
  DialogResponse,
  DialogsResponse,
} from '@packages/contracts';
import { http } from '$lib/common/services/http';

import { DIALOGS_ROUTES } from './dialogs.routes';

export const dialogsApi = {
  list() {
    return http<DialogsResponse>(DIALOGS_ROUTES.base, {
      method: 'GET',
    });
  },
  createPrivate(participantIds: string[], title?: string) {
    const payload: CreateDialog = {
      participantIds,
      type: 'private',
      title,
    };

    return http<DialogResponse>(DIALOGS_ROUTES.base, {
      method: 'POST',
      body: payload,
    });
  },
};
