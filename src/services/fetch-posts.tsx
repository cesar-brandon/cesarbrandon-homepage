import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import { cache } from "react";

const queryLastPosts = groq`
  *[_type == "post"] {
    title,
    slug,
    _createdAt,
  }| order(_createdAt desc)[0..3]
`;

export const queryAllPosts = groq`
		*[_type == "post"]{
				...,
				author->,
				topics[]->
		} | order(_createdAt desc)
`;

async function fetchLastPosts(): Promise<Post[]> {
  try {
    return await sanityClient.fetch(queryLastPosts);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function fetchPosts(): Promise<Post[]> {
  try {
    return await sanityClient.fetch(queryAllPosts);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export const getLastPosts = cache(fetchLastPosts);
export const getPosts = cache(fetchPosts);
