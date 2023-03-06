import React from "react";
import Character from "../../public/character-cartoon.gif";
import HeaderItem from "../common/HeaderItem";
import ToggleTheme from "../common/ToggleTheme";
import Wrap from "../common/Wrap";

const Header: React.FC = () => {
  return (
    <header
      className="flex items-center justify-between font-bold px-10 py-10
						  transition-all duration-500 ease"
    >
      <HeaderItem title="Projects" href="projects" />
      <HeaderItem title="Posts" href="posts" />
      <HeaderItem title="" href="/" />
      <HeaderItem title="About" href="about" />

      <ToggleTheme />

      <Wrap />
    </header>
  );
};

export default Header;
