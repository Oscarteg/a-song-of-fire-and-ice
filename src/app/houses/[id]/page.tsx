import { Character, House } from "@/models";
import { getHouse } from "@/services/houses";
import { get } from "@/services/http";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const house = await getHouse(params.id);

  const membersPromises = house?.swornMembers.map((member: string) =>
    get<Character>(member),
  );

  console.log({ membersPromises });

  const members = await Promise.all(membersPromises);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>{house?.name}</h1>
      </Suspense>
    </>
  );
}
