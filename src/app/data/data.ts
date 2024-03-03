async function getBlogPosts(): Promise<BlogPost[]> {
  return new Array(10).map((v, i) => ({ slug: `slug-${i}` }));
}
