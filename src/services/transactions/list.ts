import { db } from '@/db/connection';

export type ListTransactionsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListTransactionsResponseData = {
  id: number;
  title: string;
  type: 'income' | 'expense';
  amount: number;
  date: Date;
};

export async function listTransactions(params?: ListTransactionsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListTransactionsResponseData>('transactions', {
    select: {
      id: true,
      title: true,
      type: true,
      amount: true,
      date: true,
    },
    page,
    size,
    where: {
      // title: {
      //   value: query,
      //   op: "like",
      // },
    },
    orderBy: [{ 'transactions.created_at': 'desc' }],
  });
}
