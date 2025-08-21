import { listHistoryFn } from "@/features/history/list_history.fn";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/history/")({
  loader: async () => {
    return await listHistoryFn();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { forms } = Route.useLoaderData();
  return (
    <div className="p-4">
      {forms.map((form) => (
        <div key={form.slug}>
          <Link
            className="text-xl text-indigo-600 hover:text-indigo-500 hover:underline"
            to="/history/$slug"
            params={{ slug: form.slug }}
          >
            {form.createdAt.toLocaleDateString()} - {form.slug}
          </Link>
        </div>
      ))}
    </div>
  );
}
