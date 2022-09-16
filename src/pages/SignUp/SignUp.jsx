import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp, updateAllow } from "../../common/slices/userSlice";

import { paths } from "../../app/routes";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentUser = useSelector((state) => state.user);

   const formik = useFormik({
      initialValues: {
         hoTen: "",
         taiKhoan: "",
         matKhau: "",
         maNhom: "",
         email: "",
         soDt: "",
      },
      onSubmit: (values) => {
         console.log("[submit]", values);
         dispatch(signUp(values));
      },
   });

   useEffect(() => {
      if (currentUser?.allow) {
         navigate(paths.home);
         dispatch(updateAllow(false));
      }
   }, [currentUser]);

   return (
      <div>
         <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
               <div className="flex-1 bg-sky-100 text-center hidden lg:flex">
                  <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"></div>
               </div>
               <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                  <div>
                     <img
                        src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        className="w-32 mx-auto"
                        alt="Cover"
                     />
                  </div>
                  <div className="mt-12 flex flex-col items-center">
                     <form
                        className="w-full flex-1 mt-8"
                        onSubmit={formik.handleSubmit}
                     >
                        <div className="mx-auto flex flex-col gap-3 max-w-sm">
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">Name</label>
                              <input
                                 type="text"
                                 name="hoTen"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your name"
                              />
                           </div>
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">User Id</label>
                              <input
                                 type="text"
                                 name="taiKhoan"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your user Id"
                              />
                           </div>
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">Password</label>
                              <input
                                 type="password"
                                 name="matKhau"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your password"
                              />
                           </div>
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">Group</label>
                              <input
                                 type="text"
                                 name="maNhom"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your group ID"
                              />
                           </div>
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">Email</label>
                              <input
                                 type="text"
                                 name="email"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your email"
                              />
                           </div>
                           <div className="flex gap-3 items-center ">
                              <label className="w-28">Phone</label>
                              <input
                                 type="text"
                                 name="soDt"
                                 onChange={formik.handleChange}
                                 className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                                 placeholder="Enter your phone"
                              />
                           </div>

                           <button
                              className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                              type="submit"
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
                           <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                              Already have an account?
                              <Link
                                 to={paths.login}
                                 className="pl-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
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
      </div>
   );
};

export default SignUp;
