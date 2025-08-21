import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL ?? "");

export function getDb() {
  return drizzle({
    client: sql,
    schema: { ...schema },
  });
}
