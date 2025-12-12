"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Protected({ children, fallbackPath = "/" }) {
  const router = useRouter();
  const token = useSelector((s) => s.auth.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace(fallbackPath);
    }
  }, [hydrated, token, router, fallbackPath]);

  if (!hydrated || !token) return null;
  return children;
}
