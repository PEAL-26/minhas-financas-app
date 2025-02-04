import { OperationTypes, Status, TransactionTypes } from '@/types';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const category = sqliteTable('categories', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const transaction = sqliteTable('transactions', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  type: t.text('type').$type<TransactionTypes>().notNull(),
  incomeId: integer('income_id'),
  expenseId: integer('expense_id'),
  incomeExpenseId: integer('income_expense_id'),
  title: text('title').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  amount: real('amount').notNull().default(0.0),
  localId: integer('local_id'),
  observation: text('observation'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const expense = sqliteTable('expenses', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  needId: integer('need_id'),
  incomeId: integer('income_id'),
  categoryId: integer('category_id'),
  title: text('title').notNull(),
  description: text('description'),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  amount: real('amount').notNull().default(0.0),
  priority: integer('priority').default(1),
  type: t.text('type').$type<OperationTypes>().default('unique'),
  recurrence: integer('recurrence'),
  status: t.text('status').$type<Status>().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const income = sqliteTable('incomes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  currency: text('currency'),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  amount: real('amount').notNull().default(0.0),
  type: t.text().$type<OperationTypes>().default('unique'),
  recurrence: integer('recurrence'),
  status: t.text().$type<Status>().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const need = sqliteTable('needs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id'),
  title: text('title').notNull(),
  description: text('description'),
  priority: integer('priority').default(1),
  type: t.text().$type<OperationTypes>().default('unique'),
  recurrence: integer('recurrence'),
  amount: real('amount').default(0.0),
  status: t.text('status').$type<Status>().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const needPrice = sqliteTable('needs_prices', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  needId: integer('need_id').notNull(),
  localId: integer('local_id').notNull(),
  amount: real('amount').notNull().default(0.0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const local = sqliteTable('locals', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});
