import { get } from "@/services/http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const response = await get(
    `https://www.anapioficeandfire.com/api/houses/${id}`,
  );

  return NextResponse.json(response);
}
