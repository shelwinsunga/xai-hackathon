'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";

const components = { FRQ };

export default function App() {

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full px-4">
      <ul>
          {allPosts.map((post) => (
            <li key={post._meta.path} className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">By {post.author}</p>
              <div className="prose">
                <MDXContent code={post.mdx} components={components} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
