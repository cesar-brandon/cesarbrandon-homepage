import ButtonLink from "../common/button-link";
import ClientSideRoute from "../common/ClientSideRoute";
import { Skeleton } from "../ui/skeleton";

interface Props {
  postTitles: Post[];
}

export default function LastPost({ postTitles }: Props) {
  const simplifyDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="flex flex-col justify-center px-6 py-6 gap-10 bg-white dark:bg-border rounded-3xl">
      <ButtonLink
        className="group text-2xl font-normal"
        href="/posts"
        text="NEWS"
        ariaLabel="View All Posts"
        icon={
          <span className="font-mono ml-2 group-hover:translate-x-2 transition-all duration-300">
            {"~>"}
          </span>
        }
      />
      <div className="h-full w-full">
        {postTitles.length !== 0 ? (
          postTitles.map((post: Post, index) => (
            <ClientSideRoute
              key={index}
              route={`/posts/${post.slug.current}`}
              ariaLabel={`View ${post.title}`}
            >
              <div
                key={index}
                className="relative group p-1 pb-4 border-b cursor-pointer"
              >
                <div>
                  <h3>{post.title}</h3>
                  <p className="text-sm text-zinc-500">
                    {simplifyDate(post._createdAt)}
                  </p>
                </div>
                <div className="absolute w-3 h-3 right-8 top-6 bg-muted group-hover:bg-primary rounded-full" />
              </div>
            </ClientSideRoute>
          ))
        ) : (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-14" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
