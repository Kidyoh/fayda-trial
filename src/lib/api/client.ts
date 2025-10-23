import { API_BASE } from "@/config/env";
import { z } from "zod";

export interface ApiClientOptions {
  accessToken?: string | null;
  signal?: AbortSignal;
}

export const jsonSchema = z.unknown();

function buildHeaders(accessToken?: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  return headers;
}

async function handleResponse<T>(
  res: Response,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || `HTTP ${res.status}`);
  }
  const data = text ? JSON.parse(text) : null;
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid response shape");
  }
  return parsed.data;
}

export async function apiGet<T>(
  path: string,
  schema: z.ZodSchema<T>,
  opts: ApiClientOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: buildHeaders(opts.accessToken),
    signal: opts.signal,
    cache: "no-store",
  });
  return handleResponse(res, schema);
}

export async function apiPost<T, B = unknown>(
  path: string,
  schema: z.ZodSchema<T>,
  body?: B,
  opts: ApiClientOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: buildHeaders(opts.accessToken),
    body: body ? JSON.stringify(body) : undefined,
    signal: opts.signal,
  });
  return handleResponse(res, schema);
}

export async function apiPut<T, B = unknown>(
  path: string,
  schema: z.ZodSchema<T>,
  body?: B,
  opts: ApiClientOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: buildHeaders(opts.accessToken),
    body: body ? JSON.stringify(body) : undefined,
    signal: opts.signal,
  });
  return handleResponse(res, schema);
}

export async function apiDelete<T>(
  path: string,
  schema: z.ZodSchema<T>,
  opts: ApiClientOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: buildHeaders(opts.accessToken),
    signal: opts.signal,
  });
  return handleResponse(res, schema);
}

// Common schemas
export const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
