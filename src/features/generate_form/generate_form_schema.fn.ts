import { aiExtractFormSchema } from "@/lib/openai/openai";
import { createServerFn } from "@tanstack/react-start";

type GenerateFormSchemaRequest = {
  pdfUrl: string;
};

export const generateFormSchemaFn = createServerFn()
  .validator((request: GenerateFormSchemaRequest) => request)
  .handler(async ({ data }) => {
    // call OpenAI with prompt to generate form schema from PDF URL
    const response = await aiExtractFormSchema(data.pdfUrl);

    return response.output_text;
  });
