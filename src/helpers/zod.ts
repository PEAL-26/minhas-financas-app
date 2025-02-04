import { z } from 'zod';

export const numberFromString = (
  params?: z.RawCreateParams & {
    coerce?: boolean;
  },
) =>
  z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? value : parsed;
    }
    return value;
  }, z.number(params));
