import * as ioTs from 'io-ts';
import { createEntityDecoder } from '../../utils/toCoreEntity';

export const LINK_URL_MAX_LENGTH = 2048;

const LinkCodec = ioTs.exact(
  ioTs.type({
    linkUid: ioTs.string,
    linkUrl: ioTs.string,
  }),
);

export type Link = ioTs.TypeOf<typeof LinkCodec>;

export const toLinkEntity = createEntityDecoder(LinkCodec);
