export function isEmpty(obj?: string | object | null) {
  if (obj === undefined || obj === null) return true;
  if (typeof obj === 'string' && !obj.trim()) return true;
  if (typeof obj === 'object' && !Object.keys(obj).length) return true;

  return false;
}
