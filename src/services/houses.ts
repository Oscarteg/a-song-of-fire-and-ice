import { House } from "@/app/models";
import { get } from "./http";
import { absoluteUrl } from "../lib/utils";

export const runtime = "edge";

type GetHousesOptions = {
  page?: string;
  pageLimit?: string;
  hasTitles?: string;
  hasDiedOut?: string;
  hasSeats?: string;
};

export async function getHouses(opts: GetHousesOptions = {}) {
  return get<Array<House>>(absoluteUrl("/api/houses"), opts);
}
