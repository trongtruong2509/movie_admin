import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";

import FilmItem from "./FilmItem";
import { paths } from "../../app/routes";

import { fetchFilms, updateSuccessDelete } from "../../common/slices/filmSlice";

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const filmSlice = useSelector((state) => state.film);

   useEffect(() => {
      dispatch(fetchFilms());

      if (filmSlice?.successDelete) {
         dispatch(updateSuccessDelete(false));
      }
   }, [filmSlice?.successDelete]);

   // useEffect(() => {}, [filmSlice?.successDelete]);

   const onAddNew = () => {
      navigate(paths.addFilm);
   };

   const override = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
   };

   return (
      <div className="flex-grow">
         <div className="mt-10">
            <h1 className="text-5xl font-semibold mt-6 mb-10">Film Manager</h1>
            <div className="relative w-full flex gap-5">
               <input
                  type="text"
                  className="w-[700px] pl-10 py-2 border border-second rounded-xl outline-none focus-within:border-primary-light group"
                  placeholder="Search for movie name"
               />
               <BsSearch className="text-lg absolute top-3 left-3 opacity-50 group-focus-within:text-primary-light" />
               <button className="bg-primary py-2 px-8 rounded-lg text-white">
                  Search
               </button>
            </div>
            <div className="my-6">
               <button
                  className="border border-primary hover:bg-primary py-2 px-6 rounded-lg text-primary hover:text-white"
                  onClick={onAddNew}
               >
                  Add New Film
               </button>
            </div>
         </div>

         <div className="mt-6 w-full">
            <div
               className="grid grid-cols-12 px-5 py-3 w-full border-b-2 border-hover-1
            font-medium text-[#7d7d7d]"
            >
               <p className="col-span-1 text-secondary">Film Id</p>
               <p className="col-span-3 text-secondary">Name</p>
               <p className="col-span-2 text-secondary">Poster</p>
               <p className="col-span-4 text-secondary">Description</p>
               <p className="col-span-2 text-secondary">Actions</p>
            </div>
            {filmSlice?.pending ? (
               <div className="w-full h-96 flex items-center justify-center">
                  <SyncLoader
                     color="#4340DA"
                     // loading={loading}
                     cssOverride={override}
                     size={15}
                  />
               </div>
            ) : (
               <>
                  {filmSlice?.entities.map((film) => (
                     <FilmItem key={film.maPhim} info={film} />
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default Home;
