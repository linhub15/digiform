import { db } from "@/lib/db/db_middleware";
import { createServerFn } from "@tanstack/react-start";

export const getFormFn = createServerFn()
  .middleware([db])
  .validator((request: { slug: string }) => request)
  .handler(async ({ context, data }) => {
    const { db } = context;
    const form = await db.query.formProject.findFirst({
      where: (f, { eq }) => eq(f.slug, data.slug),
    });

    return form;
  });
