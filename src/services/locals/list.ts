import { db } from '@/db/connection';

export type ListLocalsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListLocalsResponseData = {
  id: number;
  name: string;
};

export async function listLocals(params?: ListLocalsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListLocalsResponseData>('locals', {
    select: {
      id: true,
      name: true,
    },
    page,
    size,
    where: {
      name: {
        value: query,
        op: 'like',
      },
    },
    orderBy: [{ created_at: 'desc' }],
  });
}
