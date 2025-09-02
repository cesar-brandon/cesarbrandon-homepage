import AboutCard from "@/components/about/about-card";
import GitHubContributionCard from "@/components/about/github-contribution-card";
import { LogoSticker } from "@/components/ui/sticker";

export const metadata = {
  title: "About",
  description: "About me",
};

const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <AboutCard />
      <div className="flex flex-col lg:flex-row gap-6">
        <GitHubContributionCard username="cesar-brandon" />
        <div className="relative w-full overflow-hidden min-h-[10rem] flex items-center justify-center">
          <LogoSticker className="w-24 h-24 absolute left-4 top-8 rotate-180" />
          <LogoSticker className="w-24 h-24 absolute right-8 top-1/2 -translate-y-1/2 -rotate-30" />
          <LogoSticker className="w-24 h-24 absolute left-1/2 bottom-2 -translate-x-1/2 -rotate-45" />
          <span className="text-primary dark:text-secondary font-cursive text-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            Bon día
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
