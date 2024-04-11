import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const personImages = [
  "https://dr.savee-cdn.com/things/thumbnails/6/6/124956d163aebc2f051726.webp",
  "https://dr.savee-cdn.com/things/thumbnails/6/6/121d0ebb02faec1bdbb995.webp",
  "https://dr.savee-cdn.com/things/thumbnails/6/5/7884a6fcfde0282b3c543d.webp",
  "https://dr.savee-cdn.com/things/thumbnails/6/5/dfed290ae3947d6beaff8c.webp",
  "https://dr.savee-cdn.com/things/thumbnails/6/5/db3490bdd78b1256f1919f.webp",
];

export default function SmoothScrollCards() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className="mt-[50vh] mb-[50vh]">
      {Array.from({ length: 5 }).map((_, index) => {
        const targetScale = 1 - (5 - index) * 0.05;
        return (
          <Card
            key={index}
            index={index}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}

export function Card({ index, progress, range, targetScale }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="w-full h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        className="relative w-[80%] h-[30rem] bg-background rounded-xl shadow-md m-auto overflow-hidden -top-[10%]"
        style={{ top: `calc(-10% + ${index * 25}px)`, scale }}
      >
        <div className="absolute flex gap-2 top-2 right-2 z-20">
          <span className="text-white">2:18</span>
          <div>{"🌟"}</div>
        </div>
        <motion.div style={{ scale: imageScale }} className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={personImages[index]}
            alt="person"
          />
        </motion.div>
        <div className="absolute flex flex-col bottom-2 left-2">
          <p className="text-white font-bold">Izzy B.</p>
          <span className="text-white text-sm">Los Angeles USA</span>
        </div>
      </motion.div>
    </div>
  );
}
