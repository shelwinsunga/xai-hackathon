import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";
import { formatDate } from "@/app/example/utils";
import Link from "next/link";
import meta from "./meta.json";
const components = { FRQ };

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full px-4">
        <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
        <ul>
          {allPosts.map((post) => (
            <li key={post._meta.path} className="mb-8">
              <Link href={`/course/${post._meta.path}`}>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              </Link>
              {post.subtitle && <p className="text-lg text-muted-foreground mb-4">{post.subtitle}</p>}
              <p className="text-lg text-muted-foreground mb-4">By {post.author} • {formatDate(post.date || '')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
