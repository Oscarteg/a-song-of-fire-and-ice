import clsx, { ClassValue } from "clsx";
import { env } from "@/src/env.mjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function generateUrl(url: string, params?: Record<string, string>) {
  // Check if the URL already contains query parameters
  const hasQueryParams = url.includes("?");

  const queryParams = new URLSearchParams(params).toString();

  return hasQueryParams ? `${url}&${queryParams}` : `${url}?${queryParams}`;
}
