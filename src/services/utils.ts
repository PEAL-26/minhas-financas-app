import { db } from '@/db/connection';

export async function getIdValue(tableName: string, id?: number) {
  let value = null;

  if (id) {
    const entity = await db.getFirst<{ id: number }>(tableName, {
      where: { id },
    });

    if (!entity) throw new Error(`${tableName} não existe.`);

    value = entity.id;
  }

  return value;
}

export async function getIdValueOrCreate(tableName: string, name?: string) {
  let value = null;

  if (name) {
    const entity = await db.getFirst<{ id: number }>(tableName, {
      where: { name: String(name).trim() },
    });

    if (!entity) {
      const created = await db.insert<{ id: number }>(tableName, {
        name: String(name).trim(),
      });

      value = created.id;
    } else {
      value = entity.id;
    }
  }

  return value;
}

type Recurrence = {
  type: 'unique' | 'recurrent';
  recurrence?: number | null;
  customRecurrence?: number | null;
};

export function getRecurrence(input: Recurrence) {
  const { type, recurrence, customRecurrence } = input;

  if (type === 'unique') {
    return null;
  }

  if (recurrence === null) {
    if (!customRecurrence) {
      throw new Error(
        'Quando a recorrência for personalizada, deve definir a recorrência em dias.',
      );
    }

    return customRecurrence;
  }

  if (!recurrence) {
    throw new Error('Selecione a recorrência');
  }

  return recurrence;
}
