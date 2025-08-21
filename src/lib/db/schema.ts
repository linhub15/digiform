import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { nanoid } from "@/lib/utils/nanoid";

/// Helpers
export const auditColumns = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
} as const;

export const formProject = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  ...auditColumns,
  slug: text("slug").notNull().unique().$default(() => nanoid(6)),
  fileUrl: text("file_url").notNull(),
  formSchemaGenerationModel: text("form_schema_generation_model"),
  formSchemaGeneratedAt: timestamp("form_schema_generated_at"),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formSchema: jsonb("form_schema").$type<Record<string, any>>(),
  email: text("email"),
});
