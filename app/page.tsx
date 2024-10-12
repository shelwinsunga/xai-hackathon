'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
const components = { Button };

export default function App() {
  console.log(allPosts);
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._meta.path}>
            <h2>{post.title}</h2>
            <MDXContent code={post.mdx} components={components} />
          </li>
        ))}
      </ul>
    </main>
  );
}
