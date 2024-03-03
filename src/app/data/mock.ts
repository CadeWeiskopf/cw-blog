import { BlogPost } from "./data";
import JsGeneratorFunctions from "./components/js-generator-functions";
import Home from "./components/home";

export let blogPosts: BlogPost[];
setBlogPosts();

async function setBlogPosts() {
  blogPosts = await getBlogPosts();
}
async function getBlogPosts(): Promise<BlogPost[]> {
  const blogPostsT = [
    {
      title: "Home",
      slug: "home",
    },
    {
      title: "JS Generator Functions",
      slug: "js-generator-functions",
    },
  ] as BlogPost[];

  const promises = blogPostsT.map(async (blogPost) => {
    if (blogPost.slug === "js-generator-functions") {
      const component = await JsGeneratorFunctions({ ...blogPost });
      blogPost.component = component;
    } else if (blogPost.slug === "home") {
      const component = await Home({ ...blogPost });
      blogPost.component = component;
    }
    return blogPost;
  });

  return await Promise.all(promises);
}
