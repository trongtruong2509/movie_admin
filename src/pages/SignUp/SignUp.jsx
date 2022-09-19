import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp, updateAllow } from "../../common/slices/userSlice";

import { ToastContainer } from "react-toastify";
import { paths } from "../../app/routes";
import { Link, useNavigate } from "react-router-dom";

import { signupSchema } from "./signupSchema";
import "react-toastify/dist/ReactToastify.css";
import { GROUP_ID } from "../../common/utils/config";

const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentUser = useSelector((state) => state.user);

   const formik = useFormik({
      initialValues: {
         hoTen: "",
         taiKhoan: "",
         matKhau: "",
         maNhom: GROUP_ID,
         email: "",
         maLoaiNguoiDung: "QuanTri",
         soDt: "",
      },
      validationSchema: signupSchema,
      onSubmit: (values, actions) => {
         console.log(actions);
         console.log("[submit]", values);
         dispatch(signUp(values));
      },
   });

   useEffect(() => {
      if (currentUser?.allow) {
         setTimeout(() => {
            navigate(paths.login, {
               state: {
                  userId: formik.values.taiKhoan,
                  password: formik.values.matKhau,
               },
            });
            dispatch(updateAllow(false));
         }, 2000);
      }
   }, [currentUser]);

   return (
      <div>
         <div className="flex justify-center min-h-screen text-gray-900 bg-gray-100">
            <div className="flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow sm:m-20 sm:rounded-lg">
               <div className="flex-1 hidden text-center bg-sky-100 lg:flex">
                  <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"></div>
               </div>
               <div className="p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
                  <div>
                     <img
                        src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        className="w-32 mx-auto"
                        alt="Cover"
                     />
                  </div>
                  <div className="flex flex-col items-center mt-12">
                     <form
                        className="flex-1 w-full mt-8"
                        onSubmit={formik.handleSubmit}
                        autoComplete="off"
                     >
                        <div className="flex flex-col max-w-sm gap-5 mx-auto">
                           <div className="flex items-center w-full">
                              <label className="flex-shrink-0 w-24">Name</label>
                              <div className="relative w-full">
                                 <input
                                    type="text"
                                    name="hoTen"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus-within:border-primary ${
                                       formik.errors.hoTen &&
                                       formik.touched.hoTen
                                          ? "border-red-500 focus-within:border-red-500"
                                          : "border-gray-400 focus-within:border-primary"
                                    }`}
                                    placeholder="Enter your name"
                                 />
                                 {formik.errors.hoTen &&
                                    formik.touched.hoTen && (
                                       <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                          {formik.errors.hoTen}
                                       </p>
                                    )}
                              </div>
                           </div>
                           <div className="flex items-center gap-3 ">
                              <label className="w-28">User Id</label>
                              <div className="relative w-full">
                                 <input
                                    type="text"
                                    name="taiKhoan"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus-within:border-primary ${
                                       formik.errors.taiKhoan &&
                                       formik.touched.taiKhoan
                                          ? "border-red-500 focus-within:border-red-500"
                                          : "border-gray-400 focus-within:border-primary"
                                    }`}
                                    placeholder="Enter your user Id"
                                 />
                                 {formik.errors.taiKhoan &&
                                    formik.touched.taiKhoan && (
                                       <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                          {formik.errors.taiKhoan}
                                       </p>
                                    )}
                              </div>
                           </div>
                           <div className="flex items-center gap-3 ">
                              <label className="w-28">Password</label>
                              <div className="relative w-full">
                                 <input
                                    type="password"
                                    name="matKhau"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus-within:border-primary ${
                                       formik.errors.matKhau &&
                                       formik.touched.matKhau
                                          ? "border-red-500 focus-within:border-red-500"
                                          : "border-gray-400 focus-within:border-primary"
                                    }`}
                                    placeholder="Enter your password"
                                 />
                                 {formik.errors.matKhau &&
                                    formik.touched.matKhau && (
                                       <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                          {formik.errors.matKhau}
                                       </p>
                                    )}
                              </div>
                           </div>
                           <div className="flex items-center gap-3 ">
                              <label className="w-28">Email</label>
                              <div className="relative w-full">
                                 <input
                                    type="text"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus-within:border-primary ${
                                       formik.errors.email &&
                                       formik.touched.email
                                          ? "border-red-500 focus-within:border-red-500"
                                          : "border-gray-400 focus-within:border-primary"
                                    }`}
                                    placeholder="Enter your email"
                                 />
                                 {formik.errors.email &&
                                    formik.touched.email && (
                                       <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                          {formik.errors.email}
                                       </p>
                                    )}
                              </div>
                           </div>
                           <div className="flex items-center gap-3 ">
                              <label className="w-28">Phone</label>
                              <div className="relative w-full">
                                 <input
                                    type="text"
                                    name="soDt"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus-within:border-primary ${
                                       formik.errors.soDt && formik.touched.soDt
                                          ? "border-red-500 focus-within:border-red-500"
                                          : "border-gray-400 focus-within:border-primary"
                                    }`}
                                    placeholder="Enter your phone"
                                 />
                                 {formik.errors.soDt && formik.touched.soDt && (
                                    <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                       {formik.errors.soDt}
                                    </p>
                                 )}
                              </div>
                           </div>

                           <button
                              className={`flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg 
                              bg-primary hover:bg-primary-dark focus:shadow-outline focus:outline-none ${
                                 formik.isValid && formik.dirty
                                    ? "opacity-100"
                                    : "opacity-50"
                              }`}
                              type="submit"
                              disabled={!(formik.isValid && formik.dirty)}
                           >
                              <svg
                                 className="w-6 h-6 -ml-2"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                 <circle cx="8.5" cy="7" r="4" />
                                 <path d="M20 8v6M23 11h-6" />
                              </svg>
                              <span className="ml-3">Sign Up</span>
                           </button>
                           <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                              Already have an account?
                              <Link
                                 to={paths.login}
                                 className="pl-1 text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                              >
                                 Login
                              </Link>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
         />
      </div>
   );
};

export default SignUp;
