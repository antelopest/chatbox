export const DialogType = {
  PRIVATE: 'private',
  GROUP: 'group',
} as const;

export type DialogType = (typeof DialogType)[keyof typeof DialogType];
