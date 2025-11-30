import { SubstackFeed } from "@/components/SubstackFeed";
import { ArticlePreview } from "@/components/AriclePreview";
import { BlogsList } from "@/components/BlogsList";
import Link from "next/link";
export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <article className="prose prose-lg mx-auto max-w-2xl px-3 py-5">
        <h1>Recent Posts</h1>
        <BlogsList></BlogsList>
      </article>
    </div>
  );
}
