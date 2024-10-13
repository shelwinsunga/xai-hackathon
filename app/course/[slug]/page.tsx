'use client';
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import FRQ from "@/components/frq";
import { formatDate } from "@/app/utils";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const components = { FRQ, Link };

export default function Course() {
  const params = useParams();
  const router = useRouter();
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
          <span className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <Button variant="ghost" className="text-muted-foreground underline" onClick={() => router.push('/')}>Back</Button>
          </span>
          <p className="text-lg text-muted-foreground mb-4">By {post.author} • {formatDate(post.date || '')}</p>
          <div className="prose">
            <MDXContent code={post.mdx} components={components} />
          </div>
        </article>
      </div>
    </div>
  );
}
