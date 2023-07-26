import { getPathFromURL } from "@/lib/utils";
import { get } from "@/services/http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = getPathFromURL(request.url).pop();

  const response = await get(
    `https://www.anapioficeandfire.com/api/houses/${id}`,
  );

  return NextResponse.json(response);
}
