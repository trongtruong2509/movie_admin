import React from "react";
import { useNavigate } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { paths } from "../../app/routes";

const FilmItem = ({ info }) => {
   const navigate = useNavigate();

   const onEdit = () => {
      const completePath = paths.filmDetail.replace(":id", info?.biDanh);
      navigate(completePath);
   };

   return (
      <div
         className="w-full py-2 px-5 rounded-lg grid grid-cols-12
      cursor-pointer hover:bg-hover-1 group"
      >
         <p className="col-span-1">{info?.maPhim}</p>
         <div
            className="col-span-3 hover:text-primary font-semibold"
            onClick={onEdit}
         >
            {info?.tenPhim}
         </div>
         <div className="col-span-2 w-16 h-16">
            <img
               src={info?.hinhAnh}
               alt=""
               className="w-full h-full object-cover rounded-md"
            />
         </div>
         <p className="col-span-4 line-clamp overflow-hidden pr-6">
            {info?.moTa}
         </p>
         <div className="col-span-2 text-white flex gap-3">
            <button
               className="bg-primary rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={onEdit}
            >
               <FiEdit />
               Edit
            </button>
            <button
               className="rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center border border-red-500 text-red-600
            hover:bg-red-600 hover:text-white opacity-70 hover:opacity-100"
            >
               <AiOutlineDelete />
               Delete
            </button>
         </div>
      </div>
   );
};

export default FilmItem;
