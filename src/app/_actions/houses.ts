"use server";

import { getHouses } from "@/services/houses";

type GetHousesActionInput = {
  pageSize: string;
  hasTitles?: string;
  hasDiedOut?: string;
  hasSeats?: string;
};

export async function getHousesAction({
  pageSize = "100",
  ...input
}: GetHousesActionInput) {
  return getHouses({ ...input, pageSize });
}
