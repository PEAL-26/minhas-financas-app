import { db } from "@/db/connection";

export type ListIncomesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListIncomesResponseData = {
  id: number;
  name: string;
};

export async function listIncomes(params?: ListIncomesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListIncomesResponseData>("incomes", {
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
