import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import { useState } from 'react';

interface Props {
  connection: ExpoSQLiteDatabase<Record<string, never>> & {
    $client: SQLiteDatabase;
  };
  migrated: boolean;
}

export function useSeeds(props: Props) {
  const { connection, migrated } = props;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(undefined);

  return { success, error };
}
