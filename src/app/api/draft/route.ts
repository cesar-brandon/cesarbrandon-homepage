import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { sanityClient } from "@/lib/sanity.client";
import { token } from "@/lib/token";

const clientWithToken = sanityClient.withConfig({ token });

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  draftMode().enable();

  redirect(redirectTo);
}
