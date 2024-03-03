"use server";

export default async function BlogPost({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: unknown;
}) {
  return (
    <div>
      My Post: {params.slug} {JSON.stringify(searchParams)}
    </div>
  );
}
