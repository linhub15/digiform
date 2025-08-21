import { getFormFn } from "@/features/history/get_form.fn";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/history/$slug")({
  loader: async ({ params }) => {
    return await getFormFn({ data: { slug: params.slug } });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = Route.useLoaderData();

  return (
    <div className="p-2">
      <Link className="border p-4" to="/history">
        All forms
      </Link>
      <div className="flex p-4 gap-8">
        <div>
          <h2 className="text-lg text-center py-8">Original Form File</h2>

          <a
            className="inline-block hover:bg-gray-100 p-12 border rounded"
            href={form?.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in new tab
          </a>
        </div>

        <div>
          <h2 className="text-lg text-center py-8">
            Form Schema - <code>{form?.formSchemaGenerationModel}</code>
          </h2>
          <pre className="bg-gray-100 rounded p-4">
            {JSON.stringify(form?.formSchema, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg text-center py-8">Form HTML</h2>
          <div>
            Will render the form HTML here. Supports, text, number, date.
          </div>
        </div>
      </div>
    </div>
  );
}
