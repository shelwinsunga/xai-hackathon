'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";
const components = { Button, FRQ };

export default function App() {
  console.log(allPosts);
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl px-4">
      <ul>
          {allPosts.map((post) => (
            <li key={post._meta.path} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
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
