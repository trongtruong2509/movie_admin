import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEdit, FiMonitor } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import DeleteModal from "../../common/components/Modals/DeleteModal";
import { paths } from "../../app/routes";

import { deleteFilmById, updateSelected } from "../../common/slices/filmSlice";

const FilmItem = ({ info }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);

   const onEdit = () => {
      const completePath = paths.filmDetail.replace(":id", info?.maPhim);
      navigate(completePath);
      dispatch(updateSelected(info));
   };

   const onShowtime = () => {
      const completePath = paths.showtime.replace(":id", info?.maPhim);
      navigate(completePath);
      // dispatch(updateSelected(info));
   };

   const onDelete = () => {
      console.log("[Delete] triggered");
      setShow(false);
      dispatch(deleteFilmById(info.maPhim));
   };

   return (
      <div className="grid w-full grid-cols-12 px-5 py-2 rounded-lg cursor-pointer hover:bg-hover-1 group">
         <DeleteModal
            show={show}
            content={info?.tenPhim}
            onClose={() => setShow(false)}
            onDelete={onDelete}
         />

         <p className="col-span-1">{info?.maPhim}</p>
         <div
            className="col-span-4 font-semibold xl:col-span-3 hover:text-primary"
            onClick={onEdit}
         >
            {info?.tenPhim}
         </div>
         <div className="w-16 h-20 col-span-1">
            <img
               src={info?.hinhAnh}
               alt=""
               className="object-contain w-full h-full rounded-md"
            />
         </div>
         <p className="col-span-4 py-1 pr-6 overflow-hidden line-clamp">
            {info?.moTa}
         </p>
         <div className="flex col-span-1 gap-3 text-white xl:col-span-2">
            <button
               className="bg-primary rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={onEdit}
            >
               <FiEdit />
               <span className="hidden 2xl:inline-block">Edit</span>
            </button>
            <button
               className="bg-primary-dark rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={onShowtime}
            >
               <FiMonitor />
               <span className="hidden 2xl:inline-block">Time</span>
            </button>
            <button
               className="rounded-lg h-[36px] px-2 py-1 flex gap-1 items-center justify-center border border-red-500 text-red-600
            hover:bg-red-600 hover:text-white opacity-70 hover:opacity-100"
               onClick={() => setShow(true)}
            >
               <AiOutlineDelete />
               <span className="hidden 2xl:inline-block">Delete</span>
            </button>
         </div>
      </div>
   );
};

export default FilmItem;
