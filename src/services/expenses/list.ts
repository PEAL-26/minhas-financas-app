import { db } from '@/db/connection';
import { OperationTypes, Status } from '@/types';

export type ListExpensesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListExpensesResponseData = {
  id: number;
  title: string;
  category?: { name: string };
  date: Date;
  amount: number;
  priority: 0 | 1 | 2;
  type: OperationTypes;
  recurrence: number;
  status: Status;
};

export async function listExpenses(params?: ListExpensesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListExpensesResponseData>('expenses', {
    select: {
      id: true,
      title: true,
      date: true,
      amount: true,
      priority: true,
      type: true,
      recurrence: true,
      status: true,
    },
    include: {
      categories: {
        singular: 'category',
        type: 'LEFT',
        select: {
          name: true,
        },
      },
    },
    page,
    size,
    where: {
      name: {
        value: query,
        op: 'like',
      },
    },
    orderBy: [{ 'expenses.created_at': 'desc' }],
  });
}
