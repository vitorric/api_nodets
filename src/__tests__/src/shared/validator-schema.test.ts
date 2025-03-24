import { ValidateSchema } from '@shared/validator-schema';
import { badRequest } from '@core/api-response';
import { z } from 'zod';

describe('Shared - ValidateSchema', () => {
  const ExampleSchema = z.object({
    name: z.string().min(3, 'name is too short'),
    age: z.number().int().positive('age must be positive'),
  });

  it('should return success when data is valid', () => {
    const data = { name: 'Alice', age: 30 };
    const result = ValidateSchema<typeof data>(ExampleSchema, data);

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value).toEqual(data);
    }
  });

  it('should return error when name is too short', () => {
    const data = { name: 'Al', age: 30 };
    const result = ValidateSchema<typeof data>(ExampleSchema, data);

    expect(result.isError()).toBe(true);
    if (result.isError()) {
      expect(result.value).toEqual(badRequest('name: name is too short'));
    }
  });

  it('should return error when path is missing (edge case)', () => {
    // Força uma issue sem `path`, simulando erro manualmente
    const BrokenSchema = {
      safeParse: () => ({
        success: false,
        error: {
          issues: [
            {
              message: 'something went wrong',
              path: [], // ← sem campo
            },
          ],
        },
      }),
    } as any;

    const result = ValidateSchema<any>(BrokenSchema, {});

    expect(result.isError()).toBe(true);
    if (result.isError()) {
      expect(result.value.payload.error).toBe('unknown: something went wrong');
    }
  });
});
