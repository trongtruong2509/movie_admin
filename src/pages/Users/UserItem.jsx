import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEdit, FiMonitor } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import DeleteModal from "../../common/components/Modals/DeleteModal";
import { paths } from "../../app/routes";
import { deleteUserById } from "../../common/slices/userSlice";
import UserModal from "./UserModal";

// import { deleteFilmById, updateSelected } from "../../common/slices/filmSlice";

const UserItem = ({ info }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [showDelete, setShowDelete] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);

   const onEdit = () => {
      // const completePath = paths.filmDetail.replace(":id", info?.maPhim);
      // navigate(completePath);
      // dispatch(updateSelected(info));
   };

   const onShowtime = () => {
      const completePath = paths.showtime.replace(":id", info?.maPhim);
      navigate(completePath);
      // dispatch(updateSelected(info));
   };

   const onDelete = () => {
      console.log("[Delete] triggered");
      setShowDelete(false);
      dispatch(deleteUserById(info.taiKhoan));
   };

   return (
      <div
         className="grid w-full grid-cols-12 px-5 py-2 rounded-lg hover:bg-hover-1 group"
      >
         <DeleteModal
            show={showDelete}
            content={info?.taiKhoan}
            onClose={() => setShowDelete(false)}
            onDelete={onDelete}
         />

         <UserModal
            show={showUpdate}
            info={info}
            onClose={() => setShowUpdate(false)}
         />

         <p className="flex items-center w-full col-span-2 pr-3 truncate">
            {info?.taiKhoan}
         </p>
         <p className="flex items-center col-span-1">{info?.maLoaiNguoiDung}</p>
         <p className="flex items-center w-full col-span-2 pr-3 truncate">
            {info?.hoTen}
         </p>
         <input
            type="password"
            defaultValue={info?.matKhau}
            readOnly
            className="bg-transparent outline-none cursor-default hover:bg-transparent"
         />
         {/* <p className="col-span-1">{info?.matKhau}</p> */}
         <p className="flex items-center w-full col-span-2 pr-3 truncate">
            {info?.email}
         </p>
         <p className="flex items-center col-span-2">{info?.soDT}</p>

         <div className="flex col-span-2 gap-3 text-white">
            <button
               className="bg-primary rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={() => setShowUpdate(true)}
            >
               <FiEdit />
               <span className="hidden 2xl:inline-block">Edit</span>
            </button>
            <button
               className="rounded-lg h-[36px] px-2 py-1 flex gap-1 items-center justify-center border border-red-500 text-red-600
            hover:bg-red-600 hover:text-white opacity-70 hover:opacity-100"
               onClick={() => setShowDelete(true)}
            >
               <AiOutlineDelete />
               <span className="hidden 2xl:inline-block">Delete</span>
            </button>
         </div>
      </div>
   );
};

export default UserItem;
