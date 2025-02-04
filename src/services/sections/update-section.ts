import { db } from '@/db';

export type UpdateSectionRequest = {
  name: string;
  description?: string;
};

export async function updateSectionService(data: UpdateSectionRequest, id: number) {
  await db.update(
    'sections',
    {
      name: data.name,
      description: data?.description ?? null,
      updated_at: Date.now(),
    },
    id,
  );
}
