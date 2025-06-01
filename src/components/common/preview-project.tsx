"use client";
import urlFor from "@/lib/urlFor";
import React, { useState } from "react";
import BlurImage from "./blur-image";
import ClientSideRoute from "./ClientSideRoute";
import { motion } from "motion/react";
import { ProgressiveBlur } from "../ui/progressive-blur";

type Props = {
  post: Post;
};

export default function PreviewProject({ post }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <ClientSideRoute
      ariaLabel="Read More"
      route={`/projects/${post.slug.current}`}
      className="flex items-center justify-center"
    >
      <div
        className="relative my-4 aspect-square h-[300px] overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <BlurImage
          className="object-cover object-center dark:border-none"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
          blurIntensity={4}
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0"
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-start gap-0 px-5 py-4">
            <p className="text-base font-medium text-white ">{post.title}</p>
            <span className="text-base text-zinc-300 line-clamp-1">
              {post.description}
            </span>
          </div>
        </motion.div>
      </div>
    </ClientSideRoute>
  );
}

// export default function PreviewProject({ post }: Props) {
//   return (
//     <ClientSideRoute
//       ariaLabel="Read More"
//       route={`/projects/${post.slug.current}`}
//       className="group relative h-80 w-full overflow-hidden rounded-xl dark:border-none"
//     >
//       <div className="h-[80%] w-full overflow-hidden rounded-xl transition-all duration-300">
//         <BlurImage
//           className="object-cover object-center dark:border-none"
//           src={urlFor(post.mainImage).url()}
//           alt={post.author.name}
//           fill
//         />
//       </div>
//       <div className="absolute left-0 right-0 top-0 flex h-full w-full flex-col justify-between gap-2 bg-background/40 p-4 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
//         <span className="font-cursive text-7xl text-foreground">
//           {post.title}
//         </span>
//         <p className="line-clamp-2">{post.description}</p>
//       </div>
//     </ClientSideRoute>
//   );
// }
// export default function PreviewProject({ post }: Props) {
//   return (
//     <div className="group relative h-80 w-full overflow-hidden rounded-xl dark:border-none">
//       <div className="relative h-[80%] w-full overflow-hidden transition-all duration-300 group-hover:h-[70%]">
//         <BlurImage
//           className="rounded-xl border-none border-foreground object-cover object-center dark:border-none"
//           src={urlFor(post.mainImage).url()}
//           alt={post.author.name}
//           fill
//         />
//         <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-background from-10% via-background/70 via-30% to-transparent to-60% transition-all duration-300 group-hover:h-36" />
//       </div>
//       <div className="absolute -bottom-16 flex h-28 w-full flex-col gap-2 bg-opacity-50 pb-8 transition-all duration-300 group-hover:-translate-y-16">
//         <div
//           className={cn(
//             buttonVariants({ variant: "outline" }),
//             "rounded-full border-2 font-cursive text-xl font-bold transition-all duration-150 group-hover:opacity-0",
//           )}
//         >
//           {post.title}
//         </div>
//         {/* <p className="w-full rounded-full bg-muted py-1 pl-4 font-cursive text-2xl font-bold transition-all duration-150 group-hover:opacity-0"> */}
//         {/* </p> */}
//         {/* <p className="group-hover:hidden"> */}
//         {/*   {post.description.length > 70 */}
//         {/*     ? post.description.slice(0, 70) + "..." */}
//         {/*     : post.description} */}
//         {/* </p> */}
//         <ButtonLink
//           className="mt-4 min-[692px]:mt-10 min-[860px]:mt-4"
//           href={`/projects/${post.slug.current}`}
//           text="Read More"
//           ariaLabel="Read More"
//           icon={<p className="ml-2 font-mono text-xl">{"~>"}</p>}
//         />
//       </div>
//     </div>
//   );
// }
