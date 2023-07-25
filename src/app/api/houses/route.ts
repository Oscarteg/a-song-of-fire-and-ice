import { get } from "@/services/http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = await get(
    "https://www.anapioficeandfire.com/api/houses",
    searchParams,
  );

  return NextResponse.json(response);
}
