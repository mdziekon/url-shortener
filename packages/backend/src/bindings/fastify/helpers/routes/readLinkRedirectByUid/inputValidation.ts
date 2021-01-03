import * as yup from 'yup';
import { createValueParser } from '../../utils/parseValue';
import { linkUidValidator } from '../../validators/linkUid';

const paramsSchema = yup.object({
  linkUid: linkUidValidator,
});

export const parseParams = createValueParser(paramsSchema);
