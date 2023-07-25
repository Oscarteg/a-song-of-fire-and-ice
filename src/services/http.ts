import { NextResponse } from "next/server";
import { generateUrl } from "../lib/utils";

export async function get<T>(
  url: string,
  params?: Record<string, string> | URLSearchParams,
  options: RequestInit = {},
) {
  try {
    const updatedUrl = generateUrl(url, params);
    console.log({ updatedUrl });
    const response = await fetch(updatedUrl, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
  }
}
