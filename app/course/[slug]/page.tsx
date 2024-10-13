'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";
import { formatDate } from "@/app/example/utils";
import { useParams } from "next/navigation";

const components = { FRQ };

export default function Course() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = allPosts.find(post => post._meta.path === `${slug}`);
  console.log(allPosts);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full px-4">
        <article className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">By {post.author} • {formatDate(post.date || '')}</p>
          <div className="prose">
            <MDXContent code={post.mdx} components={components} />
          </div>
        </article>
      </div>
    </div>
  );
}
