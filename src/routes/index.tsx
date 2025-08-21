import { FormFileUploader } from "@/features/formify/form_file_uploader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-xl">
          AI Form Converter
        </h1>
        <p>Use AI to convert your PDF form to an online form.</p>
      </div>

      <div>
        <FormFileUploader />
      </div>
    </div>
  );
}
