import { db } from "@/lib/database/db";
import { createServerFn } from "@tanstack/react-start";

export const getFormFn = createServerFn()
  .validator((request: { slug: string }) => request)
  .handler(async ({ data }) => {
    const form = await db.query.formProject.findFirst({
      where: (f, { eq }) => eq(f.slug, data.slug),
    });

    return form;
  });
