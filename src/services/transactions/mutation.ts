import { OperationTypes } from "@/types";

export type MutationTransaction = {
  id?: number;
  category: {
    id: number;
    name: string;
  };
  title: string;
  description?: string;
  priority?: number;
  type: OperationTypes;
  recurrence?: number | null;
  customRecurrence?: number | null;
  amount: number;
  needPrices?: {
    local?: {
      id: number;
      name: string;
    };
    amount: number;
  }[];
};

export async function mutationTransaction(request: MutationTransaction) {}
