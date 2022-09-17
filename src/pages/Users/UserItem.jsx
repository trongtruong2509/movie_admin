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
         className="w-full py-2 px-5 rounded-lg grid grid-cols-12
       hover:bg-hover-1 group"
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

         <p className="col-span-2 w-full pr-3 truncate flex items-center">
            {info?.taiKhoan}
         </p>
         <p className="col-span-1 flex items-center">{info?.maLoaiNguoiDung}</p>
         <p className="col-span-2 w-full pr-3 truncate flex items-center">
            {info?.hoTen}
         </p>
         <input
            type="password"
            defaultValue={info?.matKhau}
            readOnly
            className="bg-transparent outline-none hover:bg-transparent cursor-default"
         />
         {/* <p className="col-span-1">{info?.matKhau}</p> */}
         <p className="col-span-2 w-full pr-3 truncate flex items-center">
            {info?.email}
         </p>
         <p className="col-span-2 flex items-center">{info?.soDT}</p>

         <div className="col-span-2 text-white flex gap-3">
            <button
               className="bg-primary rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={() => setShowUpdate(true)}
            >
               <FiEdit />
               Edit
            </button>
            {/* <button
               className="bg-primary-dark rounded-lg h-[36px] px-3 py-1 flex gap-1 items-center justify-center opacity-70 hover:opacity-100"
               onClick={onShowtime}
            >
               <FiMonitor />
               Time
            </button> */}
            <button
               className="rounded-lg h-[36px] px-2 py-1 flex gap-1 items-center justify-center border border-red-500 text-red-600
            hover:bg-red-600 hover:text-white opacity-70 hover:opacity-100"
               onClick={() => setShowDelete(true)}
            >
               <AiOutlineDelete />
               Delete
            </button>
         </div>
      </div>
   );
};

export default UserItem;
