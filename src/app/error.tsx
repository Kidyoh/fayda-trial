"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring here
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred. Please try again.
            </p>
            <button
              type="button"
              aria-label="Retry"
              onClick={() => reset()}
              className="px-4 py-2 rounded-md bg-black text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
