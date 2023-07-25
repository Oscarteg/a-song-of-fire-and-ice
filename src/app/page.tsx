import Filter from "@/components/filter";
import { getPathFromURL } from "@/lib/utils";
import Link from "next/link";
import { getHousesAction } from "./_actions/houses";

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
    <>
      <Filter />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {houses?.map((house) => {
          const id = getPathFromURL(house.url).pop();
          return (
            <Link href={`/houses/${id}`} key={id}>
              <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {house.name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">
                      {house.coatOfArms}
                    </dd>
                    <dt className="sr-only">Words</dt>
                    <dd className="mt-3">{house.words}</dd>
                  </dl>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
