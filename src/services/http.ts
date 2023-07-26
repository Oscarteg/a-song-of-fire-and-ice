import { generateUrl } from "../lib/utils";

type Params = Record<string, string> | URLSearchParams;

/**
 * Perform a GET request and return the response data.
 * @param url The URL for the GET request.
 * @param params Optional parameters to append to the URL.
 * @param options Additional options for the fetch request.
 * @returns A Promise that resolves to the parsed response data.
 */
export async function get<T>(
  url: string,
  params?: Params,
  options: RequestInit = {},
): Promise<T> {
  const updatedUrl = generateUrl(url, params);

  try {
    const response = await fetch(updatedUrl, options);

    // Check if the response is successful (status 2xx) and handle errors if any.
    if (!response.ok) {
      const errorMessage = `Request failed with status: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Parse the response based on the Content-Type header.
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    } else {
      // If the response is not JSON, you can handle other content types here.
      // For example, return response.text() for plain text responses.
      throw new Error("Unsupported content type in response.");
    }
  } catch (error) {
    // Instead of logging here, let the calling code handle the error.
    throw error;
  }
}
