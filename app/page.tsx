"use client";

import { useMemo } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useFetch } from "@/hooks/useFetch";
import { useToggle } from "@/hooks/useToggle";
import { formatDate, truncate } from "@/utils/format";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const { value: showBodies, toggle } = useToggle(true);
  const { data, status, error, run } = useFetch<Post[] | null>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      immediate: true,
    }
  );

  const topFive = useMemo(() => (data ?? []).slice(0, 5), [data]);

  return (
    <div className="min-h-screen p-6 sm:p-10 font-sans bg-background text-foreground">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Next 18 + Tailwind Demo</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => void run()} isLoading={status === "loading"}>
              Reload
            </Button>
            <Button variant="secondary" onClick={toggle}>
              {showBodies ? "Hide bodies" : "Show bodies"}
            </Button>
          </div>
        </header>

        <Card
          title="JSONPlaceholder Posts"
          subtitle={`Fetched at ${formatDate(Date.now())}`}
        >
          {error ? (
            <p className="text-sm text-red-600">{error.message}</p>
          ) : null}

          {status === "loading" && !data ? (
            <p className="text-sm text-neutral-500">Loading…</p>
          ) : null}

          {status !== "loading" && topFive.length === 0 ? (
            <p className="text-sm text-neutral-500">No posts found.</p>
          ) : null}

          <ul className="divide-y divide-neutral-200/70 dark:divide-neutral-800/60">
            {topFive.map((post) => (
              <li key={post.id} className="py-3">
                <h3 className="font-medium leading-tight">{post.title}</h3>
                {showBodies ? (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {truncate(post.body, 160)}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>

        <footer className="text-xs text-neutral-500">
          Data from {" "}
          <a
            className="underline underline-offset-2"
            href="https://jsonplaceholder.typicode.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            JSONPlaceholder
          </a>
        </footer>
      </div>
    </div>
  );
}
