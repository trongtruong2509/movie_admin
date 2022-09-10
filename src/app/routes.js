import Home from "./../pages/Home/Home";
import Login from "./../pages/Login/Login";
import AddFilm from "./../pages/AddFilm/AddFilm";
import FilmDetail from "./../pages/FilmDetail/FilmDetail";
import Showtime from "./../pages/Showtime/Showtime";

export const paths = {
   home: "/",
   login: "/login",
   addFilm: "/film/addnew",
   filmDetail: "/film/detail/:id",
   showtime: "/showtime",
   users: "/users",
};

export const routes = [
   { path: paths.home, component: Home },
   { path: paths.login, component: Login },
   { path: paths.addFilm, component: AddFilm },
   { path: paths.filmDetail, component: FilmDetail },
   { path: paths.showtime, component: Showtime },
];

// export default routes;
