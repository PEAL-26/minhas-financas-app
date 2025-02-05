import { db } from '@/db/connection';

export type GetFinancialSummaryResponseData = {
  id: number;
  name: string;
};

export async function getFinancialSummary() {
  const [needResult, expenseResult, incomeResult] = await Promise.all([
    db.query<{ amount: number }>(
      "SELECT sum(amount) as amount FROM needs WHERE status='pending'",
    ),
    db.query<{ amount: number }>(
      "SELECT sum(amount) as amount FROM transactions WHERE type='expense'",
    ),
    db.query<{ amount: number }>(
      "SELECT sum(amount) as amount FROM transactions WHERE type='income'",
    ),
  ]);

  const needAmount = Number(needResult[0].amount);
  const expenseAmount = Number(expenseResult[0].amount);
  const incomeAmount = Number(incomeResult[0].amount);

  return {
    needs: needAmount,
    expenses: expenseAmount,
    incomes: incomeAmount,
    balance: parseFloat((incomeAmount - expenseAmount).toFixed(2)),
  };
}
