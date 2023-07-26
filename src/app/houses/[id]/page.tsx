import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Character } from "@/models";
import { getHouse } from "@/services/houses";
import { get } from "@/services/http";

export default async function Page({ params }: { params: { id: string } }) {
  const house = await getHouse(params.id);

  const membersPromises = house?.swornMembers.map((member: string) =>
    get<Character>(member),
  );

  const members: Array<Character> = await Promise.all(membersPromises);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{house?.name}</CardTitle>
        <CardDescription>{house?.words}</CardDescription>
      </CardHeader>

      <CardContent>
        {members?.length > 0 && (
          <>
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  Members
                </span>
              </div>
            </div>
            <ul className="divide-y divide-gray-100">
              {members?.map(({ name, aliases, ...member }: Character) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {name}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center text-xs leading-5 text-gray-500">
                      <p className="truncate">{aliases.join(", ")}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
