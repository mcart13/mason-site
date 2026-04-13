"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { formatDate, getBlogPosts, type PostSummary } from "@/lib/posts";

export function BlogList() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogPosts()
      .then((items) => {
        setPosts(items);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article className="border-t border-border pt-8" key={post.id}>
          <div className="flex items-start gap-4">
            <time className="flex-shrink-0 text-xs text-muted-foreground font-mono whitespace-nowrap">
              {formatDate(post.date)}
            </time>
            <div className="flex-1">
              <Link
                className="block group hover:text-muted-foreground transition-colors"
                href={post.href}
              >
                <h3 className="text-lg font-medium group-hover:underline">
                  {post.title}
                </h3>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
