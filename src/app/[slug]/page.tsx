"use server";

import { getBlogPost } from "../data/data";

export default async function BlogPost({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: unknown;
}) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return <>404</>;
  }
  if (!post.component) {
    return <>coming soon</>;
  }
  return post.component;
}
