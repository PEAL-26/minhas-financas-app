import { OperationTypes } from "@/types";

type Entity = { id: number; name: string };
export type MutationExpense = {
  id?: number;
  need?: Entity;
  income?: Entity;
  category?: Entity;
  title: string;
  description?: string;
  date: Date;
  amount: number;
  priority?: 0 | 1 | 2;
  type: "unique" | "recurrent";
  recurrence?: number | null;
  customRecurrence?: number | null;
  status?: "pending" | "done";
};

export async function mutationExpense(request: MutationExpense) {
  console.log(request)
}
