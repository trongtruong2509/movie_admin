import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { MdKeyboardArrowDown } from "react-icons/md";
import { signUp } from "../../common/slices/userSlice";
import { useDispatch } from "react-redux";
import { GROUP_ID } from "../../common/utils/config";

const AddUserModal = ({ ...props }) => {
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         taiKhoan: "",
         matKhau: "",
         email: "",
         soDt: "",
         maNhom: GROUP_ID,
         maLoaiNguoiDung: "QuanTri",
         hoTen: "",
      },
      onSubmit: (values) => {
         console.log("[onSubmit] Add new user", values);

         dispatch(signUp(values));
      },
   });

   if (!props.show) return null;

   return ReactDOM.createPortal(
      <div
         className="modal fixed left-0 top-0 right-0 bottom-0
               bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[999]"
         onClick={props.onClose}
      >
         <div
            className="py-3 flex flex-col gap-3 bg-white w-96 rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-xl pt-2 font-semibold">Add New User</h2>
            <form
               className="flex flex-col gap-3 pt-2"
               onSubmit={formik.handleSubmit}
            >
               <div className="flex gap-3 items-center relative">
                  <label className="w-24">Type</label>
                  <select
                     className="form-select form-select-lg appearance-none block w-full px-4 py-2 m-0 rounded-lg
                     font-normaltext-gray-700 bg-white bg-clip-padding bg-no-repeat bg-transparent
                     border border-solid border-gray-300 rounde transition ease-in-out
                     focus:text-gray-700  focus:border-blue-600 focus:outline-none z-[900]"
                     aria-label=".form-select-lg example"
                     name="maLoaiNguoiDung"
                     // onChange={(e) => handleTypeChange(e.target.value)}
                     onChange={formik.handleChange}
                  >
                     <option defaultValue value="QuanTri">
                        Admin
                     </option>
                     <option value="KhachHang">User</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute top-[6px] right-1 text-3xl opacity-50 z-[800]" />
               </div>

               <div className="flex gap-6 items-center ">
                  <label className="w-24">Acount</label>
                  <input
                     type="text"
                     name="taiKhoan"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Enter account"
                  />
               </div>
               <div className="flex gap-3 items-center ">
                  <label className="w-20">Password</label>
                  <input
                     type="password"
                     name="matKhau"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Enter password"
                  />
               </div>
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Name</label>
                  <input
                     type="text"
                     name="hoTen"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Enter your name"
                  />
               </div>
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Email</label>
                  <input
                     type="text"
                     name="email"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Enter your email"
                  />
               </div>
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Phone</label>
                  <input
                     type="text"
                     name="soDt"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Enter your phone"
                  />
               </div>
               <div className="flex gap-5 justify-end mt-4 mb-2 text-sm">
                  <button
                     className="border border-gray-500 text-gray-500  py-2 px-3 rounded-lg hover:bg-gray-500 hover:text-white"
                     onClick={props.onClose}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="bg-primary py-2 px-6 rounded-lg text-white"
                     // onClick={formik.onSubmit}
                  >
                     Add
                  </button>
               </div>
            </form>
         </div>
      </div>,
      document.getElementById("root")
   );
};

export default AddUserModal;
