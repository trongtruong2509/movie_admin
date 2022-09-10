import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiSlideshow } from "react-icons/bi";
import { BsFilm } from "react-icons/bs";

import { paths } from "../../../app/routes";

const Sidebar = () => {
   const navActive =
      "flex gap-2 items-center pl-3 py-3 text-primary font-semibold rounded-lg hover:bg-hover-1";
   const navStyle =
      "flex gap-2 items-center pl-3 py-3 rounded-lg opacity-70 hover:bg-hover-1 hover:text-primary hover:opacity-100";

   return (
      <div className="h-screen w-72 pl-4 bg-second">
         <header className="w-full h-16 mx-auto my-6">
            <h1 className="text-lg font-semibold text-black">MOVIE ADMIN</h1>
         </header>
         <main className="flex flex-col">
            <NavLink
               to={paths.home}
               className={({ isActive }) => (isActive ? navActive : navStyle)}
            >
               <BsFilm className="text-xl" />
               Films
            </NavLink>
            <NavLink
               to={paths.users}
               className={({ isActive }) => (isActive ? navActive : navStyle)}
            >
               <FiUsers className="text-xl" />
               Users
            </NavLink>
            <NavLink
               to={paths.showtime}
               className={({ isActive }) => (isActive ? navActive : navStyle)}
            >
               <BiSlideshow className="text-xl" />
               Show Time
            </NavLink>
         </main>
         <footer className="h-16 w-full"></footer>
      </div>
   );
};

export default Sidebar;
