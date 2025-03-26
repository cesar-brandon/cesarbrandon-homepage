import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import { cache } from "react";
import { isProd } from "@/config";

export const PROJECTS_QUERY = groq`
  *[_type == "project"] {
      ...,
      author->,
      topics[]->
  }| order(_updatedAt desc)
`;

const TOPICS_QUERY = groq`
  *[_type == "topic"] {
    ...
  }
`;

async function fetchProjects(): Promise<Project[]> {
  let projects = [] as Project[];
  if (isProd) {
    try {
      projects = await sanityClient.fetch(PROJECTS_QUERY);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  }

  return projects;
}

async function fetchTopics(): Promise<Topic[]> {
  let topics = [] as Topic[];
  if (isProd) {
    try {
      topics = await sanityClient.fetch(TOPICS_QUERY);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  }
  return topics;
}

export const getProjects = cache(fetchProjects);
export const getTopics = cache(fetchTopics);
