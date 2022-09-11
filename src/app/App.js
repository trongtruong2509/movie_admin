import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Outlet,
} from "react-router-dom";

import { routes, paths } from "./routes";
import Sidebar from "../common/components/Sidebar/Sidebar";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

function App() {
   return (
      <Router>
         <Routes>
            <Route path={paths.login} element={<Login />} />
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
   return (
      <div className="App flex w-screen h-screen">
         <Sidebar />
         <div className="w-full flex items-stretch overflow-auto px-12 relative overflow-y-scroll overscroll-auto scrollbar flex-grow">
            <Outlet />
         </div>
      </div>
   );
}

export default App;
