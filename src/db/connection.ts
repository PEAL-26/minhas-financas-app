import { DatabaseSQLite } from "./database";
import { join } from "node:path";
var openDatabase;
var connectionDrizzle;
const DATABASE_NAME = "minhas_financas.db";

if (typeof window !== "undefined") {
//   (async () => {
//     const initSqlJs = require("sql.js");
//     const SQL = await initSqlJs({
//       locateFile: (file: any) =>
//         `${join(
//           __dirname,
//           "..",
//           "..",
//           "node_modules",
//           "sql.js",
//           "dist",
//           file
//         )}`,
//     });
//     openDatabase = new SQL.Database();
//   })();
} else {
//   const drizzleExpoSqlite = require("drizzle-orm/expo-sqlite");
//   const expoSqlite = require("expo-sqlite");
//   openDatabase = expoSqlite.openDatabaseSync(DATABASE_NAME);
//   connectionDrizzle = drizzleExpoSqlite.drizzle(openDatabase);
}

const db = new DatabaseSQLite(openDatabase);

export { db, connectionDrizzle, DATABASE_NAME };
