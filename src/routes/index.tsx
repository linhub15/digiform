import { Uploader } from "@/lib/uploadthing/uploader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <h1 className="text-xl">
        AI Form Converter
      </h1>
      <p>Use AI to convert your PDF form to an online form.</p>

      <div>
        <Uploader />
      </div>
    </div>
  );
}
