import React from "react";

export const metadata = {
  title: "About",
  description: "About me",
}

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">About</h1>
    </div>
  );
};

export default About;
