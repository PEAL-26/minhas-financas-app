import { db } from "@/db/connection";

export type ListExpensesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListExpensesResponseData = {
  id: number;
  name: string;
};

export async function listExpenses(params?: ListExpensesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListExpensesResponseData>("expenses", {
    select: {
      id: true,
      name: true,
    },
    page,
    size,
    where: {
      name: {
        value: query,
        op: "like",
      },
    },
    orderBy: [{ created_at: "desc" }],
  });
}
