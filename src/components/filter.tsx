"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Search params
  const hasTitles = searchParams?.get("hasTitles") ?? null;
  const hasDiedOut = searchParams?.get("hasDiedOut") ?? null;
  const hasSeats = searchParams?.get("hasSeats") ?? null;
  const pageSize = searchParams?.get("pageSize") ?? 10;

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString({})}`);
    });
  }, [createQueryString, pathname, router]);

  return (
    <fieldset>
      <legend className="sr-only">Filter</legend>
      <div className="flex items-center gap-4">
        <div className="relative flex items-start">
          <input
            id="has-titles"
            aria-describedby="has-titles"
            name="has-titles"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            disabled={isPending}
            checked={hasTitles === "true"}
            onChange={(e) => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    hasTitles: e.target.checked ? "true" : null,
                  })}`,
                );
              });
            }}
          />

          <div className="ml-3 text-sm leading-6">
            <label htmlFor="has-titles" className="font-medium text-gray-900">
              Has titles
            </label>
          </div>
        </div>

        <div className="flex h-6 items-center">
          <input
            id="died-out"
            aria-describedby="died-out"
            name="died-out"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={hasDiedOut === "true"}
            disabled={isPending}
            onChange={(e) => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    hasDiedOut: e.target.checked ? "true" : null,
                  })}`,
                );
              });
            }}
          />
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="died-out" className="font-medium text-gray-900">
              Has died out
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="has-seats"
              aria-describedby="has-seats"
              name="has-seats"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={hasSeats === "true"}
              disabled={isPending}
              onChange={(e) => {
                startTransition(() => {
                  router.push(
                    `${pathname}?${createQueryString({
                      hasSeats: e.target.checked ? "true" : null,
                    })}`,
                  );
                });
              }}
            />
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="has-seats" className="font-medium text-gray-900">
                Has seats
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size"
            className="block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap"
          >
            Page size:
          </label>
          <select
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="page-size"
            value={pageSize}
            disabled={isPending}
            onChange={(e) => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    pageSize: e.target.value,
                  })}`,
                );
              });
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
}
