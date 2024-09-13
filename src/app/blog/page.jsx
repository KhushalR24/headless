import Link from "next/link";
import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { client } from "../lib/graphql-client";
import { GET_ALL_POSTS } from "../lib/post_queries";
import FeaturedImage from "../Components/FeaturedImage";
import Date from "../Components/Date";

export const metadata = {
  title: "CoolNomad -- Blogs",
  description: "Generated by create next app",
};

export default async function PostsPage() {
  const { posts } = await client.request(GET_ALL_POSTS);

  return (
    <>
      <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <div className="container lg:max-w-4xl mx-auto">
          <Header className="z-10 relative" />
        </div>
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          BLOGS
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          {" "}
          Read Our Latest Articles{" "}
        </p>
      </div>
      <main>
        <section className=" container mx-auto lg:max-w-post-list mt-4">
          <ul>
            {posts.nodes.map((post) => (
              <li className="grid grid-cols-5 gap-4 mb-4 " key={post.slug}>
                <div className="col-span-2">
                  <FeaturedImage post={post} />
                </div>
                <div className="col-span-3">
                  <h2 className="py-4">
                    <Link
                      className="text-blue-400 text-2xl hover:text-blue-600"
                      href={`/blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="py-4">
                    Published On < Date dateString={post.date} />
                  </div>
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  ></div>
                  <div className="py-4">
                    Posted Under
                    {post.categories.nodes.map((category) => (
                      <Link
                        className="text-blue-400"
                        href={`/category/${category.slug}`}
                        key={category.slug}
                      >
                        {" "}
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
