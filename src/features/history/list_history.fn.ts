import { db } from "@/lib/database/db";
import { desc } from "drizzle-orm";
import { formProject } from "@/lib/database/schema";
import { createServerFn } from "@tanstack/react-start";

export const listHistoryFn = createServerFn()
  .handler(async () => {
    const forms = await db.select().from(formProject)
      .limit(100)
      .orderBy(desc(formProject.createdAt));

    return { forms };
  });
