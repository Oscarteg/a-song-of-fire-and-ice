import { getHouses } from "@/src/services/houses";
import Link from "next/link";
import { useRouter } from "next/router";

export default async function Houses() {
  const houses = await getHouses();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {houses?.map((house) => (
          <Link href={`/houses/${house.name}`} key={house.name}>
            <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
              <div className="flex flex-1 flex-col p-8">
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {house.name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">{house.coatOfArms}</dd>
                  <dt className="sr-only">Words</dt>
                  <dd className="mt-3">{house.words}</dd>
                </dl>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
