import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BiSlideshow } from "react-icons/bi";
import { BsFilm } from "react-icons/bs";

import { paths } from "../../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../slices/userSlice";

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
      "flex gap-2 items-center pl-3 py-3 text-primary font-semibold rounded-lg hover:bg-hover-1";
   const navStyle =
      "flex gap-2 items-center pl-3 py-3 rounded-lg opacity-70 hover:bg-hover-1 hover:text-primary hover:opacity-100";

   return (
      <div className="h-screen pl-4 w-72 bg-second">
         <header className="flex items-center justify-center w-full h-12 mx-auto mt-6 mb-12">
            <Link to={paths.home} className="text-lg font-semibold text-black ">
               MOVIE ADMIN
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
                  Films
               </NavLink>
               <NavLink
                  to={paths.users}
                  className={({ isActive }) =>
                     isActive ? navActive : navStyle
                  }
               >
                  <FiUsers className="text-xl" />
                  Users
               </NavLink>
               <NavLink
                  to={paths.showtime}
                  className={({ isActive }) =>
                     isActive ? navActive : navStyle
                  }
               >
                  <BiSlideshow className="text-xl" />
                  Show Time
               </NavLink>
            </main>
            <footer className="w-full h-28">
               {currentUser && (
                  <div className="flex flex-col gap-4">
                     <h2 className="w-full pr-3 font-semibold text-center truncate">
                        {currentUser.hoTen}
                     </h2>
                     <button
                        className="px-3 py-2 mr-3 text-white rounded-lg bg-primary hover:bg-primary-dark"
                        onClick={logoutHandle}
                     >
                        Log out
                     </button>
                  </div>
               )}
            </footer>
         </div>
      </div>
   );
};

export default Sidebar;
