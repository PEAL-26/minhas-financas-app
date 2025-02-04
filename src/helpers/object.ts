export function getValueObject<T>(object: Record<string, any>, property: string): T | undefined {
  if (object && typeof object === 'object') {
    return object[property];
  }

  return undefined;
}

export function getKeyObject(object: Record<string, any>, value: string) {
  if (object && typeof object === 'object') {
    const keys = Object.keys(object);
    const values = Object.values(object);

    for (let i = 0; i < values.length; i++) {
      if (values[i] === value) {
        return keys[i];
      }
    }
  }

  return undefined;
}
