import * as yup from 'yup';
import { createValueParser } from '../../utils/parseValue';
import { linkUrlValidator } from '../../validators/linkUrl';

const paramsSchema = yup.object({
  linkUrl: linkUrlValidator,
});

export const parseParams = createValueParser(paramsSchema);
