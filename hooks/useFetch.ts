"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type UseFetchOptions<T> = {
  immediate?: boolean;
  initialData?: T | null;
  requestInit?: RequestInit;
};

export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions<T> = {}
) {
  const { immediate = true, initialData = null, requestInit } = options;

  const initSignature = useMemo(
    () => JSON.stringify(requestInit ?? {}),
    [requestInit]
  );

  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<FetchStatus>(
    immediate && url ? "loading" : "idle"
  );

  const run = useCallback(async () => {
    if (!url) return;
    setStatus("loading");
    setError(null);
    try {
      const response = await fetch(url, requestInit);
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      const json = (await response.json()) as T;
      setData(json);
      setStatus("success");
      return json;
    } catch (err) {
      setError(err as Error);
      setStatus("error");
    }
  }, [url, initSignature]);

  useEffect(() => {
    if (immediate) {
      void run();
    }
  }, [immediate, run]);

  return { data, error, status, run } as const;
}

export default useFetch;


