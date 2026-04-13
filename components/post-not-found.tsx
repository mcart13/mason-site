"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getBlogPost } from "@/lib/posts";

export function PostNotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <main className="px-6 pt-40">Loading...</main>;
  }

  return (
    <main className="px-6 pt-40 pb-20 md:px-12 md:pt-48 md:pb-32">
      <div className="max-w-4xl mx-auto">
        <p>Post not found</p>
        <Link className="mt-4 inline-block" href="/writing/">
          ← Back
        </Link>
      </div>
    </main>
  );
}
