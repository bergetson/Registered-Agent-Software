"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
      Redirecting to the{" "}
      <Link href="/dashboard" className="mx-1 underline">
        dashboard
      </Link>
      ...
    </div>
  );
}
