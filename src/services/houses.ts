import { House } from "@/app/models";
import { get } from "./http";
import { absoluteUrl } from "../lib/utils";

export const runtime = "edge";

type GetHousesOptions = {
  pageSize?: string;
  hasTitles?: string;
  hasDiedOut?: string;
  hasSeats?: string;
};

export async function getHouses(opts: GetHousesOptions = {}) {
  return get<Array<House>>(absoluteUrl("/api/houses"), opts);
}

export async function getHouse(id: string) {
  return get<House>(absoluteUrl(`/api/houses/${id}`));
}
