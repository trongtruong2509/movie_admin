import Home from "./../pages/Home/Home";
import Login from "./../pages/Login/Login";
import AddFilm from "./../pages/AddFilm/AddFilm";
import FilmDetail from "./../pages/FilmDetail/FilmDetail";
import Showtime from "./../pages/Showtime/Showtime";
import SignUp from "./../pages/SignUp/SignUp";
import Users from "../pages/Users/Users";

export const paths = {
   home: "/",
   login: "/login",
   signup: "/signup",
   addFilm: "/film/addnew",
   filmDetail: "/film/detail/:id",
   showtime: "/film/showtime/:id",
   users: "/users",
};

export const routes = [
   { path: paths.home, component: Home },
   { path: paths.login, component: Login },
   { path: paths.signup, component: SignUp },
   { path: paths.addFilm, component: AddFilm },
   { path: paths.filmDetail, component: FilmDetail },
   { path: paths.showtime, component: Showtime },
   { path: paths.users, component: Users },
];

// export default routes;
