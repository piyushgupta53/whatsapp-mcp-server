import { AxiosError } from "axios";

export function formatErrorResponse(error: unknown, context: string) {
  const err = error as AxiosError<{ message?: string; error?: string }>;

  const message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Unknown error occurred";

  return {
    isError: true,
    content: [
      {
        type: "text" as const,
        text: `❌ ${context} failed: ${message}`,
      },
    ],
  };
}
