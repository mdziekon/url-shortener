import { OptionalObjectSchema } from 'yup/lib/object';
import { failure, success } from '../../../../../common/utils/result';

export const createValueParser = <T extends OptionalObjectSchema<any>>(schema: T) => (input: unknown) => {
  try {
    const validInput = schema.validateSync(input, { stripUnknown: true });

    return success({
      value: validInput,
    });
  } catch (exception: unknown) {
    return failure({
      invalid: true,
    });
  }
};
