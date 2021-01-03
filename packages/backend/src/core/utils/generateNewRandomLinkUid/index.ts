import { randomBytes as syncRandomBytes } from 'crypto';
import { promisify } from 'util';
import { failure, FailureType, success, SuccessType } from '../../../common/utils/result';

const BITS_IN_BYTE = 8;
const BASE64_BITS = 6;
export const UID_LENGTH = 10;

const randomBytes = promisify(syncRandomBytes);
const replacementTable: Record<string, string> = {
  '+': '-',
  '/': '_',
};

type GenerateNewRandomLinkUidSuccessType = SuccessType<{ value: string }>;
type GenerateNewRandomLinkUidFailureType = FailureType<{ error: true }>;

/**
 * Generates pseudo-random string of base64-ish values.
 * With 10 characters, it should provide 2^(6*10) bits of entropy, which is
 * approx. 10^18 of possible values.
 */
export const generateNewRandomLinkUid = async (): Promise<
  GenerateNewRandomLinkUidSuccessType | GenerateNewRandomLinkUidFailureType
> => {
  try {
    const bytesToGenerate = Math.ceil((BASE64_BITS * UID_LENGTH) / BITS_IN_BYTE);

    const randValueBuffer = await randomBytes(bytesToGenerate);

    const randValue = randValueBuffer
      .toString('base64')
      .substr(0, UID_LENGTH)
      .split('')
      .map((character) => {
        const replacementValue = replacementTable[character];

        return replacementValue ?? character;
      })
      .join('');

    return success({
      value: randValue,
    });
  } catch (exception: unknown) {
    return failure({ error: true });
  }
};
