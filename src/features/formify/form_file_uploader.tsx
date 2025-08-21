import { useServerFn } from "@tanstack/react-start";
import { UploadDropzone } from "@/lib/uploadthing/upload_components";
import { formifyFn } from "./formify.fn";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function FormFileUploader() {
  const generateFormSchema = useGenerateFormSchema();
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState<Record<string, unknown> | null>(null);

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
  const generateFormSchema = useServerFn(formifyFn);

  return useMutation({
    mutationFn: async (pdfUrl: string) => {
      return await generateFormSchema({ data: { pdfUrl } });
    },
  });
}
