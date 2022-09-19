import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import debounce from "lodash.debounce";
import { BsSearch } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";

import FilmItem from "./FilmItem";
import { paths } from "../../app/routes";

import { fetchFilms, updateSuccessDelete } from "../../common/slices/filmSlice";
import { removeAccents } from "../../common/utils/helper";

const Home = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const filmSlice = useSelector((state) => state.film);
   const [searchTerm, setSearchTerm] = useState("");
   const [films, setFilms] = useState([]);

   useEffect(() => {
      dispatch(fetchFilms());

      if (filmSlice?.successDelete) {
         dispatch(updateSuccessDelete(false));
      }
   }, [filmSlice?.successDelete]);

   useEffect(() => {
      setFilms(filmSlice?.entities);
   }, [filmSlice?.entities]);

   const updateQuery = () => {
      console.log("[searchTerm]", searchTerm);
      if (searchTerm) {
         const normalizeTerm = removeAccents(searchTerm);

         const results = filmSlice?.entities.filter((f) =>
            removeAccents(f.tenPhim.toLowerCase()).includes(normalizeTerm)
         );

         console.log("[results]", results);

         setFilms(results);
      } else {
         if (filmSlice?.success) {
            setFilms(filmSlice?.entities);
         }
      }
   };

   // debounce
   const delayedQuery = useCallback(debounce(updateQuery, 500), [searchTerm]);

   useEffect(() => {
      delayedQuery();

      // Cancel the debounce on useEffect cleanup.
      return delayedQuery.cancel;
   }, [searchTerm, delayedQuery]);

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
            <h1 className="mt-6 mb-10 text-5xl font-semibold">Film Manager</h1>
            <div className="relative flex w-full gap-5">
               <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="lg:w-[800px] w-96 pl-10 py-2 border border-second rounded-xl outline-none focus-within:border-primary-light group"
                  placeholder="Search for movie name"
               />
               <BsSearch className="absolute text-lg opacity-50 top-3 left-3 group-focus-within:text-primary-light" />
               {/* <button className="px-8 py-2 text-white rounded-lg bg-primary">
                  Search
               </button> */}
            </div>
            <div className="my-6">
               <button
                  className="px-6 py-2 border rounded-lg border-primary hover:bg-primary text-primary hover:text-white"
                  onClick={onAddNew}
               >
                  Add New Film
               </button>
            </div>
         </div>

         <div className="w-full mt-6">
            <div
               className="grid grid-cols-12 px-5 py-3 w-full border-b-2 border-hover-1
            font-medium text-[#7d7d7d]"
            >
               <p className="col-span-1 text-secondary">Film Id</p>
               <p className="col-span-4 xl:col-span-3 text-secondary">Name</p>
               <p className="col-span-1 text-secondary">Poster</p>
               <p className="col-span-4 text-secondary">Description</p>
               <p className="col-span-1 xl:col-span-2 text-secondary">
                  Actions
               </p>
            </div>
            {filmSlice?.pending ? (
               <div className="flex items-center justify-center w-full h-96">
                  <SyncLoader
                     color="#3498DB"
                     cssOverride={override}
                     size={15}
                  />
               </div>
            ) : (
               <>
                  {films.map((film) => (
                     <FilmItem key={film.maPhim} info={film} />
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default Home;
