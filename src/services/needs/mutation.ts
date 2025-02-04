import { db } from '@/db/connection';
import { OperationTypes, Status } from '@/types';
import { getIdValueOrCreate, getRecurrence } from '../utils';

export type MutationNeed = {
  id?: number;
  category?: {
    id?: number;
    name?: string;
  };
  title: string;
  description?: string;
  priority?: number;
  type: OperationTypes;
  recurrence?: number | null;
  customRecurrence?: number | null;
  amount: number;
  status?: Status;
  needPrices?: {
    local: {
      id?: number;
      name: string;
    };
    amount: number;
  }[];
};

type MutationNeedResponse = MutationNeed & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function mutationNeed(request: MutationNeed) {
  let {
    id,
    title,
    description,
    amount,
    priority,
    type,
    category,
    status,
    needPrices = [],
  } = request;

  const category_id = await getIdValueOrCreate('categories', category?.name);
  const recurrence = getRecurrence(request);

  let need;
  if (id) {
    need = await db.getFirst('needs', { where: { id } });
    if (!need) throw new Error('Necessidade não encontrada.');

    need = await db.update<MutationNeedResponse>(
      'needs',
      {
        category_id,
        title,
        description,
        amount,
        priority,
        type,
        recurrence,
        status,
        updated_at: Date.now(),
      },
      id,
    );
  } else {
    need = await db.insert<MutationNeedResponse>('needs', {
      category_id,
      title,
      description,
      amount,
      priority,
      type,
      recurrence,
      status,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  for (const price of needPrices) {
    const need_id = need.id;
    const local_id = await getIdValueOrCreate('locals', price.local?.name);

    const needPrice = await db.getFirst<{ id: number }>('needs_prices', {
      where: { need_id, local_id },
    });

    if (needPrice) {
      db.update(
        'needs_prices',
        {
          need_id,
          local_id,
          amount: price.amount,
          updated_at: Date.now(),
        },
        needPrice.id,
      );
    } else {
      db.insert('needs_prices', {
        need_id,
        local_id,
        amount: price.amount,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
    }
  }
}
