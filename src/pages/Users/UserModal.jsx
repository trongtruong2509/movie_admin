import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { MdKeyboardArrowDown } from "react-icons/md";
import { signUp, updateUserInfo } from "../../common/slices/userSlice";
import { useDispatch } from "react-redux";
import { GROUP_ID } from "../../common/utils/config";
import { signupSchema } from "../SignUp/signupSchema";
import { userSchema } from "./userSchema";

const UserModal = ({ ...props }) => {
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         taiKhoan: props.info?.taiKhoan ?? "",
         matKhau: props.info?.matKhau ?? "",
         email: props.info?.email ?? "",
         soDt: props.info?.soDT ?? "",
         maNhom: GROUP_ID,
         maLoaiNguoiDung: props.info?.maLoaiNguoiDung ?? "QuanTri",
         hoTen: props.info?.hoTen ?? "",
      },
      validationSchema: userSchema,
      onSubmit: (values) => {
         if (props?.info) {
            console.log("[update user]", values);
            dispatch(updateUserInfo(values));
            props.onClose();
         } else {
            console.log("[onSubmit] Add new user", values);
            dispatch(signUp(values));
            props.onClose();
         }
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
            className="flex flex-col gap-3 p-6 py-3 bg-white w-96 rounded-xl"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="pt-2 text-xl font-semibold">
               {props.info ? "Update User" : "Add New User"}
            </h2>
            <form
               className="flex flex-col gap-5 pt-2"
               onSubmit={formik.handleSubmit}
            >
               <div className="relative flex items-center gap-3">
                  <label className="w-24">Type</label>
                  <select
                     className="form-select form-select-lg appearance-none block w-full px-4 py-2 m-0 rounded-lg
                     font-normaltext-gray-700 bg-white bg-clip-padding bg-no-repeat bg-transparent
                     border border-solid border-gray-300 rounde transition ease-in-out
                     focus:text-gray-700  focus:border-blue-600 focus:outline-none z-[900]"
                     aria-label=".form-select-lg example"
                     name="maLoaiNguoiDung"
                     onChange={formik.handleChange}
                     defaultValue={props?.info?.maLoaiNguoiDung ?? "QuanTri"}
                  >
                     <option value="QuanTri">Admin</option>
                     <option value="KhachHang">User</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute top-[6px] right-1 text-3xl opacity-50 z-[800]" />
               </div>

               <div className="flex items-center">
                  <label className="flex-shrink-0 w-20">Acount</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="taiKhoan"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-full focus-within:border-primary ${
                           formik.errors.taiKhoan && formik.touched.taiKhoan
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Enter account"
                        defaultValue={props?.info?.taiKhoan ?? ""}
                        readOnly={props?.info ? true : false}
                     />
                     {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.taiKhoan}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex items-center">
                  <label className="flex-shrink-0 w-20">Name</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="hoTen"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-full focus-within:border-primary ${
                           formik.errors.hoTen && formik.touched.hoTen
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Enter your name"
                        defaultValue={props?.info?.hoTen ?? ""}
                     />
                     {formik.errors.hoTen && formik.touched.hoTen && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.hoTen}
                        </p>
                     )}
                  </div>
               </div>
               {!props?.info && (
                  <div className="flex items-center">
                     <label className="flex-shrink-0 w-20">Password</label>
                     <div className="relative w-full">
                        <input
                           type="password"
                           name="matKhau"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-full focus-within:border-primary ${
                              formik.errors.matKhau && formik.touched.matKhau
                                 ? "border-red-500 focus-within:border-red-500"
                                 : "border-gray-400 focus-within:border-primary"
                           }`}
                           placeholder="Enter password"
                        />
                        {formik.errors.matKhau && formik.touched.matKhau && (
                           <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                              {formik.errors.matKhau}
                           </p>
                        )}
                     </div>
                  </div>
               )}
               <div className="flex items-center">
                  <label className="flex-shrink-0 w-20">Email</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-full focus-within:border-primary ${
                           formik.errors.email && formik.touched.email
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Enter your email"
                        defaultValue={props?.info?.email ?? ""}
                     />
                     {formik.errors.email && formik.touched.email && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.email}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex items-center">
                  <label className="flex-shrink-0 w-20">Phone</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="soDt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-full focus-within:border-primary ${
                           formik.errors.soDt && formik.touched.soDt
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Enter your phone"
                        defaultValue={props?.info?.soDT ?? ""}
                     />
                     {formik.errors.soDt && formik.touched.soDt && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.soDt}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex justify-end gap-5 mt-4 mb-2 text-sm">
                  <button
                     className="px-3 py-2 text-gray-500 border border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white"
                     onClick={props.onClose}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className={`px-6 py-2 text-white rounded-lg bg-primary ${
                        formik.isValid && formik.dirty
                           ? "opacity-100"
                           : "opacity-50"
                     }`}
                     disabled={!(formik.isValid && formik.dirty)}
                  >
                     {props.info ? "Update" : "Add"}
                  </button>
               </div>
            </form>
         </div>
      </div>,
      document.getElementById("root")
   );
};

export default UserModal;
