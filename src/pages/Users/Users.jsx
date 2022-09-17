import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import debounce from "lodash.debounce";
import { BsSearch } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";

import AddUserModal from "./AddUserModal";
import { paths } from "../../app/routes";

import {
   fetchUsers,
   queryUsers,
   updateSuccessDeleteUser,
} from "../../common/slices/userSlice";
import UserItem from "./UserItem";

const Users = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userSlice = useSelector((state) => state.user);

   const [show, setShow] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      dispatch(fetchUsers());

      if (userSlice?.successDelete) {
         dispatch(updateSuccessDeleteUser(false));
      }
   }, [userSlice?.successDelete]);

   const updateQuery = () => {
      if (searchTerm) {
         dispatch(queryUsers(searchTerm));
      } else {
         dispatch(fetchUsers());
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
      setShow(true);
   };

   const override = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
   };

   return (
      <div className="flex-grow">
         <AddUserModal show={show} onClose={() => setShow(false)} />

         <div className="mt-10">
            <h1 className="text-5xl font-semibold mt-6 mb-10">Users Manager</h1>
            <div className="relative w-full flex gap-5">
               <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[700px] pl-10 py-2 border border-second rounded-xl outline-none focus-within:border-primary-light group"
                  placeholder="Search for account"
               />
               <BsSearch className="text-lg absolute top-3 left-3 opacity-50 group-focus-within:text-primary-light" />
               <button className="bg-primary py-2 px-8 rounded-lg text-white">
                  Search
               </button>
            </div>
            <div className="my-6">
               <button
                  className="border border-primary hover:bg-primary py-2 px-4 rounded-lg text-primary hover:text-white"
                  onClick={onAddNew}
               >
                  Add New User
               </button>
            </div>
         </div>

         <div className="mt-6 w-full">
            <div
               className="grid grid-cols-12 px-5 py-3 w-full border-b-2 border-hover-1
            font-medium text-[#7d7d7d]"
            >
               <p className="col-span-2 text-secondary">Account</p>
               <p className="col-span-1 text-secondary">Type</p>
               <p className="col-span-2 text-secondary">Full Name</p>
               <p className="col-span-1 text-secondary">Password</p>
               <p className="col-span-2 text-secondary">Email</p>
               <p className="col-span-2 text-secondary">Phone</p>
               <p className="col-span-2 text-secondary">Actions</p>
            </div>

            {userSlice?.pending ? (
               <div className="w-full h-96 flex items-center justify-center">
                  <SyncLoader
                     color="#3498DB"
                     // loading={loading}
                     cssOverride={override}
                     size={15}
                  />
               </div>
            ) : (
               <>
                  {userSlice?.entities.map((user) => (
                     <UserItem key={user.taiKhoan} info={user} />
                  ))}
               </>
            )}
         </div>
      </div>
   );
};

export default Users;
