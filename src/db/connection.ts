import { DatabaseSQLite } from "./database";

var drizzle
var openDatabaseSync

if(typeof window !== "undefined"){
    console.log("web")
}else{
    const drizzleExpoSqlite = require("drizzle-orm/expo-sqlite");
    const expoSqlite = require("expo-sqlite");

    drizzle = drizzleExpoSqlite.drizzle
    openDatabaseSync = expoSqlite.openDatabaseSync
}

// import { drizzle } from "drizzle-orm/expo-sqlite";
// import { openDatabaseSync } from "expo-sqlite";

export const DATABASE_NAME = "minhas_financas.db";

export const openDatabase = openDatabaseSync(DATABASE_NAME);
export const connectionDrizzle = drizzle(openDatabase);

export const db = new DatabaseSQLite(openDatabase);
