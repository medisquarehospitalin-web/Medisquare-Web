import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SettingItem = { key: string; value: string };

export function getSettingValue(
  settings: SettingItem[] | undefined,
  key: string,
  fallback = "",
) {
  return settings?.find((s) => s.key === key)?.value || fallback;
}

export function isValidImageUrl(
  url?: string | { fileUrl?: string; url?: string } | null,
) {
  if (!url) return false;
  const urlStr = typeof url === "string" ? url : url.fileUrl || url.url;
  if (!urlStr) return false;
  return (
    urlStr.startsWith("/") ||
    urlStr.startsWith("http://") ||
    urlStr.startsWith("https://") ||
    !urlStr.includes(":")
  );
}

export function getImageUrl(
  url?: string | { fileUrl?: string; url?: string } | null,
) {
  if (!url) return "";
  const urlStr = typeof url === "string" ? url : url.fileUrl || url.url;
  if (!urlStr) return "";
  if (
    urlStr.startsWith("/") ||
    urlStr.startsWith("http://") ||
    urlStr.startsWith("https://")
  ) {
    return urlStr;
  }
  const fileBase =
    process.env.NEXT_PUBLIC_FILE_BASE_URL || "/";
  const base = fileBase.endsWith("/") ? fileBase : `${fileBase}/`;
  return `${base}${urlStr}`;
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit & { timeout?: number },
): Promise<Response> {
  const { timeout = 5000, ...options } = init || {};

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(input, {
      ...options,
      signal: options.signal || controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}
