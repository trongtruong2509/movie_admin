import React, { useEffect, useState } from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Outlet,
   useLocation,
   Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { routes, paths } from "./routes";
import Sidebar from "../common/components/Sidebar/Sidebar";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../common/slices/userSlice";

function App() {
   const [userLogged, setUserLogged] = useState(
      JSON.parse(localStorage.getItem("currentUser"))
   );

   // useEffect(() => {
   //    localStorage.setItem("currentUser", JSON.stringify(userLogged));
   // }, [userLogged]);

   const logIn = () => setUserLogged(true);
   const logOut = () => setUserLogged(false);

   return (
      <Router>
         <Routes>
            <Route path={paths.login} element={<Login logInUpdate={logIn} />} />
            <Route path={paths.signup} element={<SignUp />} />
            <Route exact path="/" element={<Layout />}>
               {routes.map(({ component: Component, path }) => {
                  return (
                     <Route
                        exact
                        key={path}
                        path={path}
                        element={<Component />}
                     />
                  );
               })}
            </Route>
         </Routes>
      </Router>
   );
}

function Layout() {
   const location = useLocation(); // current location
   const dispatch = useDispatch();

   const userLogged = JSON.parse(localStorage.getItem("currentUser"));

   if (userLogged) {
      dispatch(updateUser(userLogged));
   }

   return userLogged ? (
      <div className="flex w-screen h-screen App">
         <Sidebar />
         <div className="relative flex items-stretch flex-grow w-full px-12 overflow-auto overflow-y-scroll overscroll-auto scrollbar">
            <Outlet />
         </div>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
         />
      </div>
   ) : (
      <Navigate
         to={paths.login}
         replace
         state={{ from: location }} // <-- pass location in route state
      />
   );
}

export default App;
