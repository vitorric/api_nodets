import { ZodSchema } from 'zod';
import { badRequest } from '@core/api-response';
import { Either, error, success } from '@core/either';

export function validateSchema<T>(
  schema: ZodSchema,
  data: unknown,
): Either<ReturnType<typeof badRequest>, T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const field = firstIssue?.path?.[0] ?? 'unknown';
    const message = firstIssue?.message ?? 'Erro de validação';

    return error(badRequest(`${field}: ${message}`));
  }

  return success(result.data);
}
