import { db } from "@/db/connection";

export type ListTransactionsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListTransactionsResponseData = {
  id: number;
  name: string;
};

export async function listTransactions(params?: ListTransactionsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListTransactionsResponseData>("transactions", {
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
