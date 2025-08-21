import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/react-router";
import { PostHogProvider } from "posthog-js/react";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
            defaults: "2025-05-24",
            capture_exceptions: true,
            debug: import.meta.env.MODE === "development",
          }}
        >
          <nav className="py-4">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-blue-500 hover:underline px-4 py-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-blue-500 hover:underline px-4 py-2"
                >
                  History
                </Link>
              </li>
            </ul>
          </nav>

          {children}
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}
