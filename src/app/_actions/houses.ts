"use server";

import { getHouses } from "@/services/houses";

type GetHousesActionInput = {
  pageSize: string;
  hasTitles?: string;
  hasDiedOut?: string;
  hasSeats?: string;
};

export async function getHousesAction(input: GetHousesActionInput) {
  return getHouses(input);
}
