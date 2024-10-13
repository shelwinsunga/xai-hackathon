import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
 
const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    subtitle: z.string().optional(),
    order: z.number().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});
 
export default defineConfig({
  collections: [posts],
});