import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { nanoid } from "@/lib/utils/nanoid";

/// Helpers
export const auditColumns = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
} as const;

export const formProject = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique().$default(() => nanoid(6)),
  ...auditColumns,
  fileUrl: text("file_url").notNull(),
  formSchemaGeneratedAt: timestamp("form_schema_generated_at"),
  formSchema: jsonb("form_schema").$type<Record<string, any>>(),
  email: text("email"),
});
