import { client } from "../../lib/graphql-client";
import { gql } from "graphql-request";
import { notFound } from "next/navigation";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

export const metadata = {
  title: "CoolNomad -- Blogs",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  const query = gql`
    query GetAllPosts {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const data = await client.request(query);

  return data.posts.nodes.map((post) => ({
    blogId: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const query = gql`
    query NewQuery($id: ID!) {
      post(id: $id, idType: SLUG) {
        content(format: RENDERED)
        date
        excerpt(format: RENDERED)
        modified
        slug
        title(format: RENDERED)
        featuredImage {
          node {
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
              }
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  const variables = { id: params.blogId };

  const data = await client.request(query, variables);

  if (!data.post) {
    notFound();
  }

  const post = data.post;

  return (
    <>
      <div className="h-[12vh] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <div className="container lg:max-w-4xl mx-auto">
          <Header className="z-10 relative" />
        </div>
      </div>
      <article className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 text-sm mb-4">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </header>

        {post.featuredImage &&
          post.featuredImage.node.mediaDetails.sizes.length > 0 && (
            <img
              src={post.featuredImage.node.mediaDetails.sizes[0].sourceUrl}
              width={post.featuredImage.node.mediaDetails.sizes[0].width}
              height={post.featuredImage.node.mediaDetails.sizes[0].height}
              alt={post.title}
              className="w-full h-auto mb-6 object-cover rounded-lg"
            />
          )}

        <div
          className="prose prose-lg mb-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <p className="text-lg font-semibold mb-2">Categories:</p>
        <ul className="list-disc pl-5">
          {post.categories.nodes.map((category) => (
            <li key={category.slug} className="text-blue-600 hover:underline">
              {category.name}
            </li>
          ))}
        </ul>
      </article>
      <Footer />
    </>
  );
}
