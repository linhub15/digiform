import { useServerFn } from "@tanstack/react-start";
import { UploadDropzone } from "../../lib/uploadthing/upload_components";
import { generateFormSchemaFn } from "./generate_form_schema.fn";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function DigiformUploader() {
  const generateFormSchema = useGenerateFormSchema();
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState("");

  const handleUploadComplete = async (url?: string) => {
    setLoading(true);

    if (!url) {
      console.error("No URL provided for PDF upload.");
      alert("upload failed: missing URL");
      return;
    }

    const result = await generateFormSchema.mutateAsync(url);
    setSchema(result);
    setLoading(false);
  };

  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(data) =>
          handleUploadComplete(data.at(0)?.ufsUrl)}
      />
      <div className="py-10">
        {loading
          ? <span className="animate-pulse">Generating form...</span>
          : ""}
      </div>
      <pre>
        {JSON.stringify(schema, null, 2)}
      </pre>
    </>
  );
}

function useGenerateFormSchema() {
  const generateFormSchema = useServerFn(generateFormSchemaFn);

  return useMutation({
    mutationFn: async (pdfUrl: string) => {
      return await generateFormSchema({ data: { pdfUrl } });
    },
  });
}
