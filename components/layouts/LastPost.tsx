import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import React from "react";
import ClientSideRoute from "../common/ClientSideRoute";

const query = groq`
		*[_type == "post"] {
				title,
				slug,
				_createdAt,
		}| order(_createdAt desc)[0..3]
`;

const LastPost = async () => {
  const postTitles = await sanityClient.fetch(query);

  const simplifyDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="flex flex-col justify-center md:px-10 gap-10">
      <h2 className="text-2xl font-normal text-center">NEWS</h2>
      <div>
        {postTitles.map((post: Post, index: number) => (
          <ClientSideRoute key={index} route={`/posts/${post.slug.current}`}>
            <div
              key={index}
              className="p-1 pb-4 border-b hover:bg-zinc-100 cursor-pointer"
            >
              <h3>{post.title}</h3>
              <p className="text-sm text-zinc-500">
                {simplifyDate(post._createdAt)}
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
};

export default LastPost;
