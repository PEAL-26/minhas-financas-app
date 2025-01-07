import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const category = sqliteTable("categories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export type NeedTypes = "only" | "daily" | "weekly" | "annual" | "customized";

export const need = sqliteTable("needs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  categoryId: text("category_id"),
  title: text("title").notNull(),
  description: text("description"),
  priority: integer("priority").default(1),
  type: t.text().$type<NeedTypes>().default("only"),
  value: real("value").default(0.0),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});
