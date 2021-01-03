import { CoreContext } from '../../../context';

interface LogInput {
  producerId: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export const log = (params: { ctx: CoreContext; input: LogInput }): void => {
  const { ctx, input } = params;
  const {
    components: { logging },
  } = ctx;

  logging.log(input.message, { producerId: input.producerId, level: input.level });
};
