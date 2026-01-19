import * as z from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    { message: 'Incorrect email' },
  )
  .min(5)
  .max(254);
