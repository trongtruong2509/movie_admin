import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import debounce from "lodash.debounce";
import { BsSearch } from "react-icons/bs";
import SyncLoader from "react-spinners/SyncLoader";

import {
   fetchUsers,
   queryUsers,
   updateSuccessDeleteUser,
} from "../../common/slices/userSlice";
import UserItem from "./UserItem";
import UserModal from "./UserModal";

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
         <UserModal show={show} onClose={() => setShow(false)} />

         <div className="mt-10">
            <h1 className="mt-6 mb-10 text-5xl font-semibold">Users Manager</h1>
            <div className="relative flex w-full gap-5">
               <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[700px] pl-10 py-2 border border-second rounded-xl outline-none focus-within:border-primary-light group"
                  placeholder="Search for account"
               />
               <BsSearch className="absolute text-lg opacity-50 top-3 left-3 group-focus-within:text-primary-light" />
               <button className="px-8 py-2 text-white rounded-lg bg-primary">
                  Search
               </button>
            </div>
            <div className="my-6">
               <button
                  className="px-4 py-2 border rounded-lg border-primary hover:bg-primary text-primary hover:text-white"
                  onClick={onAddNew}
               >
                  Add New User
               </button>
            </div>
         </div>

         <div className="w-full mt-6">
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
               <div className="flex items-center justify-center w-full h-96">
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
