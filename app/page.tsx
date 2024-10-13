import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/components/ui/button";
import { formatDate } from "./utils";
import FRQ from "@/components/frq";
import Link from "next/link";
import meta from "@/content/meta.json";
import { toRoman } from "./utils";

const components = { FRQ };


export default function App() {
  const ordered = meta.ordered;
  
  return (
    <div className="flex">
      {/* Side Navigation */}
      <aside className="w-96 h-screen bg-primary text-primary-foreground p-6">
        <div className="flex flex-col gap-2 p-9">
          <h2 className="text-4xl font-semibold mb-12 whitespace-normal break-words">{meta.title}</h2>
              <h3 className="text-lg font-thin mb-2 border-b border-primary-foreground/20 pb-2">TABLE OF CONTENTS</h3>
                  <ul className="space-y-2">
                    {allPosts.map((post, index) => (
                      <li key={post._meta.path}>
                        <Link href={`/course/${post._meta.path}`} className="hover:underline flex justify-between items-center">
                          {ordered ? (
                            <>
                              <span className="truncate w-[90%]">{post.title}</span>
                              <span>{toRoman(index + 1)}</span>
                            </>
                          ) : (
                            post.title
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
            </div>
          </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Table of Contents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post, index) => (
            <div key={post._meta.path} className="card bg-white shadow-md border hover:shadow-xl hover:border-gray-900 rounded-lg overflow-hidden">
              <Link href={`/course/${post._meta.path}`} className="block p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {ordered ? `Chapter ${index + 1}: ${post.title}` : post.title}
                </h2>
                {post.subtitle && <p className="text-md text-muted-foreground mb-4">{post.subtitle}</p>}
                <p className="text-sm text-muted-foreground">
                  By {post.author} • {formatDate(post.date || '')}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
