import Prism from "prismjs";
import { blogPosts } from "./mock";

type CodeBlocks = {
  id: string;
  content: string;
};
export type BlogPost = {
  title: string;
  slug: string;
  component?: JSX.Element;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((e) => e.slug === slug);
}
