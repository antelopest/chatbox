import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export const VALIDATION_ERROR = 'VALIDATION_ERROR';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
      });
    }

    return result.data;
  }
}
