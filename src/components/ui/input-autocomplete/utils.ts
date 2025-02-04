import { getValueObject } from '@/helpers/object';

export function filter<TData extends object = any>(
  data: TData[],
  searchProperty: string,
  query?: string,
): TData[] {
  if (!Array.isArray(data)) return [];
  if (!data.length) return [];

  const regex = new RegExp(`${query ? query?.trim() : ''}`, 'i');
  return data.filter((item) => {
    const value = getValueObject<string>(item, searchProperty);
    return value && value.search(regex) >= 0;
  });
}

export function compare(obj = Object({}), key: string, compare: string) {
  return obj[key].toLowerCase() === compare.toLowerCase().trim();
}
