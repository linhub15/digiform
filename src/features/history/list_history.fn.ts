import { desc } from "drizzle-orm";
import { formProject } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@/lib/db/database";

export const listHistoryFn = createServerFn()
  .handler(async () => {
    const forms = await db.select().from(formProject)
      .limit(100)
      .orderBy(desc(formProject.createdAt));

    return { forms };
  });
