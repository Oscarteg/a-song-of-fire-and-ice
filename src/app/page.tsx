import Filter from "@/components/filter";
import { getPathFromURL } from "@/lib/utils";
import Link from "next/link";
import { getHousesAction } from "./_actions/houses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";

type SearchParams = {
  pageSize: string;
};

export default async function Houses({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const houses = await getHousesAction({ ...searchParams });

  return (
    <div className="flex flex-col gap-2">
      <Filter />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr"
      >
        {houses?.map((house) => {
          const id = getPathFromURL(house.url).pop();
          return (
            <li key={id} className="col-span-1">
              <Link
                href={`/houses/${id}`}
                key={id}
                className="flex flex-1 flex-col divide-y divide-gray-200 text-center"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{house.name}</CardTitle>
                    <CardDescription>{house.region}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>{house.coatOfArms}</div>
                    <div>{house.words}</div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
