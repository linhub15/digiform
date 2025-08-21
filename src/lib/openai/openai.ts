import { OpenAI } from "openai";
import { z } from "zod";

const apiKey = process.env.OPENAI_API_KEY; // Set your API key in env
const openai = new OpenAI({ apiKey });

const formSchema = z.object({
  title: z.string(),
  fields: z.array(z.object({
    label: z.string(),
    name: z.string(),
    type: z.literal(["text", "number", "date"]),
  })),
});

export async function aiExtractFormSchema(fileUrl: string) {
  const response = await openai.responses.parse(
    {
      model: "gpt-4.1-mini",
      instructions: [
        "You are a form schema generating assistant that takes in an image or PDF file and generates a JSON form schema.",
        "Analyze the PDF and extract each field's label (for humans), name (for html), and type (for validation).",
      ].join(" "),
      input: [
        {
          role: "user",
          content: [
            { type: "input_file", file_url: fileUrl },
          ],
        },
      ],

      text: {
        format: {
          type: "json_schema",
          strict: true,
          schema: z.toJSONSchema(formSchema),
          name: "form_schema",
        },
      },
    },
  );

  return response;
}
