'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";
const components = { Button, FRQ };

export default function App() {
  console.log(allPosts);
  return (
    <main className="flex justify-center">
      <div className="max-w-3xl w-full">
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
    </main>
  );
}
