import { db } from '@/db/connection';
import { OperationTypes } from '@/types';

export type ListNeedsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListNeedsResponseData = {
  id: number;
  category?: { name: string };
  title: string;
  priority: 0 | 1 | 2;
  type: OperationTypes;
  recurrence: number | null;
  amount: number;
};

export async function listNeeds(params?: ListNeedsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListNeedsResponseData>('needs', {
    select: {
      id: true,
      title: true,
      priority: true,
      type: true,
      recurrence: true,
      amount: true,
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
    orderBy: [{ 'needs.created_at': 'desc' }],
  });
}
