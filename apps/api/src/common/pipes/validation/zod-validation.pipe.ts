import { BadRequestException, type PipeTransform } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';
import { ErrorCode } from '@common/errors';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        throw validationException(err);
      }

      throw invalidInputException();
    }
  }
}

function validationException(error: ZodError): BadRequestException {
  return new BadRequestException({
    code: ErrorCode.VALIDATION_ERROR,
    message: 'Validation failed',
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
      issueCode: issue.code,
    })),
  });
}

function invalidInputException(): BadRequestException {
  return new BadRequestException({
    code: ErrorCode.INVALID_INPUT,
    message: 'Invalid input',
  });
}
