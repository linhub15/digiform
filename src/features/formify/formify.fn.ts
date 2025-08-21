import { db } from "@/lib/db/db_middleware";
import { formProject } from "@/lib/db/schema";
import { aiExtractFormSchema } from "@/lib/openai/openai";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

type GenerateFormSchemaRequest = {
  pdfUrl: string;
};

export const formifyFn = createServerFn()
  .middleware([db])
  .validator((request: GenerateFormSchemaRequest) => request)
  .handler(async ({ context, data }) => {
    const { db } = context;
    const [inserted] = await db.insert(formProject).values({
      fileUrl: data.pdfUrl,
    }).returning({ id: formProject.id });

    const response = await aiExtractFormSchema(data.pdfUrl);

    const formSchema = response.output_parsed;

    await db.update(formProject)
      .set({
        formSchema: formSchema,
        formSchemaGeneratedAt: new Date(),
      })
      .where(eq(formProject.id, inserted.id));

    return formSchema;
  });
