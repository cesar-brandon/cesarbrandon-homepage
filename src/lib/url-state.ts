export interface SearchParams {
  topics?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>,
): SearchParams {
  return {
    topics: typeof params.topics === "string" ? params.topics : undefined,
  };
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
