import { db } from "@/db/connection";

export type ListNeedsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListNeedsResponseData = {
  id: number;
  name: string;
};

export async function listNeeds(params?: ListNeedsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListNeedsResponseData>("needs", {
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
