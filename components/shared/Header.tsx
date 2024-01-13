"use client";

import SearchBar from "./SearchBar";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="p-3 flex items-center justify-between gap-3">
        <SearchBar />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
