import { db } from '@/db/connection';

export type ListCategoriesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListCategoriesResponseData = {
  id: number;
  name: string;
};

export async function listCategories(params?: ListCategoriesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListCategoriesResponseData>('categories', {
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
