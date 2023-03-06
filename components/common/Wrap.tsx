import React from "react";

const Wrap: React.FC = () => {
  return (
    <>
      <div
        className="h-[72px] w-[72px] overflow-hidden rounded-full
			border absolute left-1/2 ml-[-36px] top-[10px] bg-zinc-900 z-[2]
			transition-all duration-500 ease
			active:z-[999] active:w-[3000px] active:h-[3000px] active:ml-[-1500px] active:mt-[-1500px] t-1/2"
      ></div>
    </>
  );
};

export default Wrap;

// <div
//   className="h-[72px] w-[72px] overflow-hidden rounded-full
// border absolute left-1/2 ml-[-36px] top-[10px] z-[2]"
// >
//   <Link href={"/"}>
//     <span>
//       <Image
//         className="invert mt-[.5rem]"
//         src={Character}
//         alt="link-home"
//       ></Image>
//     </span>
//   </Link>
// </div>
//
