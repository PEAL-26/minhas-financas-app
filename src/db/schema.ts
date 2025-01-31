// import { sql } from "drizzle-orm";
// import * as t from "drizzle-orm/sqlite-core";
// import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

// export const category = sqliteTable("categories", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const transaction = sqliteTable("transactions", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   incomeId: integer("income_id"),
//   expenseId: integer("expense_id"),
//   incomeExpenseId: integer("income_expense_id"),
//   date: integer("created_at", { mode: "timestamp" }).notNull(),
//   amount: real("amount").notNull().default(0.0),
//   localId: integer("local_id"),
//   observation: text("observation"),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const expense = sqliteTable("expenses", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   needId: integer("need_id"),
//   incomeId: integer("income_id"),
//   title: text("title"),
//   description: text("description"),
//   date: integer("created_at", { mode: "timestamp" }).notNull(),
//   amount: real("amount").notNull().default(0.0),
//   priority: integer("priority").default(1),
//   type: t.text().$type<NeedTypes>().default("unique"),
//   recurrence: integer("recurrence"),
//   status: t.text().$type<Status>().default("pending"),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const income = sqliteTable("incomes", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   title: text("title"),
//   description: text("description"),
//   currency: text("currency"),
//   date: integer("created_at", { mode: "timestamp" }).notNull(),
//   amount: real("amount").notNull().default(0.0),
//   type: t.text().$type<NeedTypes>().default("unique"),
//   recurrence: integer("recurrence"),
//   status: t.text().$type<Status>().default("pending"),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const need = sqliteTable("needs", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   categoryId: integer("category_id"),
//   title: text("title").notNull(),
//   description: text("description"),
//   priority: integer("priority").default(1),
//   type: t.text().$type<NeedTypes>().default("unique"),
//   recurrence: integer("recurrence"),
//   amount: real("amount").default(0.0),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const needPrice = sqliteTable("needs_prices", {
//   needId: integer("need_id").notNull(),
//   localId: integer("local_id").notNull(),
//   amount: real("amount").notNull().default(0.0),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });

// export const local = sqliteTable("locals", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`current_timestamp`
//   ),
// });
