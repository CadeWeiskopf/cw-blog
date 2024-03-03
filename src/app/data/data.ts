export async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      title: "JS Generator Functions",
      slug: "js-generator-functions",
    },
    {
      title: "Test",
      slug: "test",
    },
    {
      title: "Penguins are moving to the North Pole",
      slug: "penguins-are-moving-towards-the-north-pole",
    },
  ];
}
