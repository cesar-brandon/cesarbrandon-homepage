import Carousel from "@/components/layouts/Carousel";
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
		*[_type == "project"] {
				...,
				author->,
				topics[]->
		}| order(_createdAt desc)
`;

export default async function Home() {
  const projects = await sanityClient.fetch(query);

  return <Carousel projects={projects} />;
}
