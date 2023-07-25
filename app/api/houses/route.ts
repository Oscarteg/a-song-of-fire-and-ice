import { get } from "@/src/services/http";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await get(
    "https://www.anapioficeandfire.com/api/houses?pageSize=1000",
  );

  return NextResponse.json(response);
}
