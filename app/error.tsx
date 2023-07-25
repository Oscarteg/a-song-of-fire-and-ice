"use client"; // Error components must be Client Components

import Toast from "@/src/components/toast";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  console.log("asdsa");

  return (
    <div>
      <h1>ERROR</h1>
      <p>{error.message}</p>
    </div>
  );
}
