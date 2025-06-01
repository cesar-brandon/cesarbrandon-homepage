import { InfiniteSlider } from "@/components/ui/infinite-slider";

const companies = [
  { title: "Company 1", image: "1.jpg", url: "https://company1.com" },
  { title: "Company 2", image: "2.png", url: "https://company2.com" },
  { title: "Company 3", image: "3.jpg", url: "https://company3.com" },
  { title: "Company 4", image: "4.webp", url: "https://company4.com" },
  { title: "Company 5", image: "5.png", url: "https://company5.com" },
  { title: "Company 6", image: "6.png", url: "https://company6.com" },
];

export function CompaniesCarousel() {
  return (
    <div className="w-[80dvw] sm:w-[90dvw] md:w-full flex flex-col justify-center px-6 py-6 gap-10 bg-card rounded-3xl">
      <section className=" flex justify-center">
        <InfiniteSlider speedOnHover={200} speed={20} gap={16}>
          {companies.map((company, index) => (
            <img
              key={index}
              src={`/companies/${company.image}`}
              alt={company.title}
              className="aspect-square w-[80px] sm:w-[120px] rounded-xl object-contain bg-white"
            />
          ))}
        </InfiniteSlider>
      </section>
    </div>
  );
}
