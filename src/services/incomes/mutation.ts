import { db } from '@/db/connection';
import { OperationTypes, Status } from '@/types';
import { getRecurrence } from '../utils';

export type MutationIncome = {
  id?: number;
  title: string;
  description?: string;
  currency?: string;
  date: Date;
  amount: number;
  type: OperationTypes;
  recurrence?: number | null;
  customRecurrence?: number | null;
  status: Status;
};

type MutationIncomeResponse = MutationIncome & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function mutationIncome(request: MutationIncome) {
  const { id, title, description, currency, amount, type, status } = request;

  const date = new Date(request.date).getTime();
  const recurrence = getRecurrence(request);

  if (id) {
    const income = await db.getFirst('incomes', { where: { id } });
    if (!income) throw new Error('Renda não encontrada.');

    return db.update<MutationIncomeResponse>(
      'incomes',
      {
        title,
        description,
        currency,
        date,
        amount,
        type,
        recurrence,
        status,
        updated_at: Date.now(),
      },
      id,
    );
  } else {
    return db.insert<MutationIncomeResponse>('incomes', {
      title,
      description,
      currency,
      date,
      amount,
      type,
      recurrence,
      status,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }
}
