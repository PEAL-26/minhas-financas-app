import * as drizzleExpoSqlite from "drizzle-orm/expo-sqlite";
import * as expoSqlite from "expo-sqlite";

import { DatabaseSQLite } from "./database";

const DATABASE_NAME = "minhas_financas.db";

const openDatabase = expoSqlite.openDatabaseSync(DATABASE_NAME);
const connectionDrizzle = drizzleExpoSqlite.drizzle(openDatabase);

const db = new DatabaseSQLite(openDatabase);

export { db, openDatabase, connectionDrizzle, DATABASE_NAME };
