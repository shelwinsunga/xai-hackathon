import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import { formatDate } from "./utils";
import FRQ from "@/components/frq";
import Link from "next/link";
import meta from "./meta.json";

const components = { FRQ };

export default function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{meta.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <div key={post._meta.path} className="card bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={`/course/${post._meta.path}`} className="block p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              {post.subtitle && <p className="text-md text-muted-foreground mb-4">{post.subtitle}</p>}
              <p className="text-sm text-muted-foreground">
                By {post.author} • {formatDate(post.date || '')}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
