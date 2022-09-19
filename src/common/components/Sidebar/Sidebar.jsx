import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { BiSlideshow } from "react-icons/bi";
import { BsFilm } from "react-icons/bs";

import { paths } from "../../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../slices/userSlice";
import AdminIcon from "../../../assets/icon-admin.png";

const Sidebar = () => {
   const currentUser = useSelector((state) => state.user.current);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandle = () => {
      dispatch(updateUser(null));
      localStorage.setItem("currentUser", null);
      localStorage.setItem("accessToken", null);
      navigate(paths.login);
   };

   const navActive =
      "flex gap-2 items-center justify-center xl:justify-start py-3 xl:px-4 text-primary font-semibold rounded-lg hover:bg-hover-1";
   const navStyle =
      "flex gap-2 items-center justify-center xl:justify-start py-3 xl:px-4 rounded-lg opacity-70 hover:bg-hover-1 hover:text-primary hover:opacity-100";

   return (
      <div className="w-16 h-screen xl:w-72 bg-second">
         <header className="flex items-center justify-center w-full h-12 mx-auto mt-6 mb-12">
            <Link
               to={paths.home}
               className="flex items-center justify-center gap-3 text-lg font-semibold text-black"
            >
               <img
                  src={AdminIcon}
                  alt="Admin Icon"
                  className="object-cover w-12 h-12"
               />
               <span className="hidden text-xl text-transparent xl:block bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
                  MOVIE ADMIN
               </span>
            </Link>
         </header>
         <div className="flex flex-col justify-between h-[calc(100%-120px)]">
            <main className="flex flex-col">
               <NavLink
                  to={paths.home}
                  className={({ isActive }) =>
                     isActive ? navActive : navStyle
                  }
               >
                  <BsFilm className="text-xl" />
                  <span className="hidden xl:inline-block">Films</span>
               </NavLink>
               <NavLink
                  to={paths.users}
                  className={({ isActive }) =>
                     isActive ? navActive : navStyle
                  }
               >
                  <FiUsers className="text-xl" />
                  <span className="hidden xl:inline-block">Users</span>
               </NavLink>
               {/* <NavLink
                  to={paths.showtime}
                  className={({ isActive }) =>
                     isActive ? navActive : navStyle
                  }
               >
                  <BiSlideshow className="text-xl" />
                  <span className="hidden xl:inline-block">Show Time</span>
               </NavLink> */}
            </main>
            <footer className="w-full h-28">
               {currentUser && (
                  <div className="flex flex-col justify-end gap-4">
                     <h2 className="hidden w-full pr-3 font-semibold text-center truncate xl:block">
                        {currentUser.hoTen}
                     </h2>
                     <button
                        className="flex justify-center gap-3 px-2 py-2 mx-1 text-white rounded-lg xl:mx-6 xl:px-3 bg-primary hover:bg-primary-dark"
                        onClick={logoutHandle}
                     >
                        <span className="hidden xl:inline-block">Log out</span>
                        <FiLogOut className="text-xl" />
                     </button>
                  </div>
               )}
            </footer>
         </div>
      </div>
   );
};

export default Sidebar;
