import { db } from '@/db/connection';
import { OperationTypes, Status } from '@/types';

export type ListIncomesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListIncomesResponseData = {
  id: number;
  title: string;
  date: Date;
  amount: number;
  type: OperationTypes;
  recurrence: number | null;
  status: Status;
};

export async function listIncomes(params?: ListIncomesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListIncomesResponseData>('incomes', {
    select: {
      id: true,
      title: true,
      date: true,
      amount: true,
      type: true,
      recurrence: true,
      status: true,
    },
    page,
    size,
    where: {
      title: {
        value: query,
        op: 'like',
      },
    },
    orderBy: [{ 'incomes.created_at': 'desc' }],
  });
}
