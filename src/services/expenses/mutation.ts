import { db } from '@/db/connection';
import { getIdValue, getIdValueOrCreate, getRecurrence } from '../utils';

type Entity = { id: number; name: string };
export type MutationExpense = {
  id?: number;
  need?: Entity;
  income?: Entity;
  category?: Entity;
  title: string;
  description?: string;
  date: Date;
  amount: number;
  priority?: 0 | 1 | 2;
  type: 'unique' | 'recurrent';
  recurrence?: number | null;
  customRecurrence?: number | null;
  status?: 'pending' | 'done';
};

type MutationExpenseResponse = MutationExpense & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function mutationExpense(request: MutationExpense) {
  const { id, title, description, amount, priority, type, need, income, category, status } =
    request;

  const need_id = await getIdValue('needs', need?.id);
  const income_id = await getIdValue('incomes', income?.id);
  const category_id = await getIdValueOrCreate('categories', category?.name);
  const date = new Date(request.date).getTime();
  const recurrence = getRecurrence(request);

  if (id) {
    const expense = await db.getFirst('expenses', { where: { id } });
    if (!expense) throw new Error('Despesa não encontrada.');

    return db.update<MutationExpenseResponse>(
      'expenses',
      {
        need_id,
        income_id,
        category_id,
        title,
        description,
        date,
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
    return db.insert<MutationExpenseResponse>('expenses', {
      need_id,
      income_id,
      category_id,
      title,
      description,
      date,
      amount,
      priority,
      type,
      recurrence,
      status,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }
}
