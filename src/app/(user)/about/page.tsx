import AboutCard from "@/components/about/about-card";
import GitHubContributionCard from "@/components/about/github-contribution-card";
import StickerContainer from "./sticker-container";

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
        <StickerContainer />
      </div>
    </div>
  );
};

export default About;
