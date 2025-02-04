import { db } from '@/db/connection';
import { TransactionTypes } from '@/types';
import { getIdValue } from '../utils';

export type MutationTransaction = {
  id?: number;
  type: TransactionTypes;
  income?: {
    id: number;
    title: string;
  };
  expense?: {
    id: number;
    title: string;
  };
  incomeExpense?: {
    id: number;
    title: string;
  };
  title?: string;
  date: Date;
  amount: number;
  local?: { id?: number; name?: string };
  observation?: string;
};

type MutationTransactionResponse = MutationTransaction & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function mutationTransaction(request: MutationTransaction) {
  const { id, type, income, expense, incomeExpense, amount, local, observation } = request;

  const title =
    {
      income: income?.title || '',
      expense: expense?.title || '',
    }[type] || request?.title;

  if (!title) {
    const message =
      {
        income: 'Selecione uma Renda',
        expense: 'Selecione uma Despesa',
      }[type] || 'Insira um título ou selecione uma renda\\despesa para essa transação.';

    throw new Error(message);
  }

  const date = new Date(request.date).getTime();
  const income_id = await getIdValue('incomes', income?.id);
  const expense_id = await getIdValue('expenses', expense?.id);
  const income_expense_id = await getIdValue('incomes', incomeExpense?.id);
  const local_id = await getIdValue('locals', local?.id);

  if (id) {
    const income = await db.getFirst('transactions', { where: { id } });
    if (!income) throw new Error('Transação não encontrada.');

    return db.update<MutationTransactionResponse>(
      'transactions',
      {
        type,
        income_id,
        expense_id,
        income_expense_id,
        title,
        date,
        amount,
        local_id,
        observation,
        updated_at: Date.now(),
      },
      id,
    );
  } else {
    return db.insert<MutationTransactionResponse>('transactions', {
      type,
      income_id,
      expense_id,
      income_expense_id,
      title,
      date,
      amount,
      local_id,
      observation,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }
}
