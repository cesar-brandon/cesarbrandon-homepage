"use client"
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import React, { useState, useEffect } from "react";
import ClientSideRoute from "../common/ClientSideRoute";
import { Skeleton } from "../ui/skeleton";

const query = groq`
  *[_type == "post"] {
    title,
    slug,
    _createdAt,
  }| order(_createdAt desc)[0..3]
`;

const LastPost = () => {
  const [postTitles, setPostTitles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityClient.fetch(query);
        setPostTitles(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      <div >
        {postTitles.length !== 0 ?
          postTitles.map((post: Post, index) => (
            <ClientSideRoute key={index} route={`/posts/${post.slug.current}`}>
              <div
                key={index}
                className="p-1 pb-4 border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <h3>{post.title}</h3>
                <p className="text-sm text-zinc-500">
                  {simplifyDate(post._createdAt)}
                </p>
              </div>
            </ClientSideRoute>
          ))
          : (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-full h-14" />
              <Skeleton className="w-full h-14" />
              <Skeleton className="w-full h-14" />
              <Skeleton className="w-full h-14" />
            </div>
          )}
      </div>
    </div>
  );
};

export default LastPost;
