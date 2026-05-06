import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import { cache } from "react";

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
  try {
    const raw = await sanityClient.fetch(PROJECTS_QUERY);
    return Array.isArray(raw) ? raw.map(normalizeProjectFromSanity) : [];
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

/** Payload from Sanity before defaults (legacy `projectType` or missing fields). */
type SanityProjectDoc = Omit<Project, "ownership" | "platform"> & {
  ownership?: Project["ownership"];
  platform?: Project["platform"];
  projectType?: number;
};

/** Sanity may omit new fields on old documents; support legacy projectType (1 own, 2 freelance). */
function normalizeProjectFromSanity(doc: SanityProjectDoc): Project {
  const ownership: Project["ownership"] =
    doc.ownership ??
    (doc.projectType === 2 ? "freelance" : "own");
  const platform: Project["platform"] = doc.platform ?? "web";
  return { ...doc, ownership, platform };
}

async function fetchTopics(): Promise<Topic[]> {
  try {
    return await sanityClient.fetch(TOPICS_QUERY);
  } catch (error) {
    console.error("Error fetching topics: ", error);
    return [];
  }
}

export const getProjects = cache(fetchProjects);
export const getTopics = cache(fetchTopics);
