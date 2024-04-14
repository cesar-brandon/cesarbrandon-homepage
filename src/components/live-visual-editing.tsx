"use client";

import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "next-sanity";
import { useEffect } from "react";

import { sanityClient } from "@/lib/sanity.client";

// Always enable stega in Live Mode
const stegaClient = sanityClient.withConfig({
  stega: {
    enabled: true,
    studioUrl: "http://localhost:3000/studio/",
  },
});

export default function LiveVisualEditing() {
  useLiveMode({ client: stegaClient });
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" && window === parent) {
      location.href = "/api/disable-draft";
    }
  }, []);

  return <VisualEditing />;
}
