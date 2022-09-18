import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "./loginSchema";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
   userLogin,
   updateAllow,
   updateRemember,
} from "../../common/slices/userSlice";
import { paths } from "../../app/routes";

const Login = ({ logInUpdate }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const currentUser = useSelector((state) => state.user);
   const [remember, setRemember] = useState(false);

   useEffect(() => {
      if (currentUser?.allow) {
         logInUpdate();

         setTimeout(() => {
            navigate(paths.home);
            dispatch(updateAllow(false));
         }, 1000);
      }

      console.log("[location]", location.state);
   }, [currentUser]);

   useEffect(() => {
      dispatch(updateRemember(remember));
   }, [remember]);

   const formik = useFormik({
      initialValues: {
         taiKhoan: location?.state?.userId ?? "",
         matKhau: location?.state?.password ?? "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
         console.log("[onSubmit]", values);
         dispatch(userLogin(values));
      },
   });

   return (
      <div>
         <section className="h-screen py-10 lg:px-20">
            <div className="h-full px-6 text-gray-800">
               <div className="flex flex-wrap items-center justify-center h-full gap-6 xl:justify-center lg:justify-between">
                  <div className="mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
                     <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample"
                     />
                  </div>
                  <div className="mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0">
                     <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="relative mb-6">
                           <input
                              type="text"
                              name="taiKhoan"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`form-control block w-full max-w-[400px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none ${
                                 formik.errors.taiKhoan &&
                                 formik.touched.taiKhoan
                                    ? "border-red-500 focus-within:border-red-500"
                                    : "border-gray-400 focus-within:border-primary"
                              }`}
                              placeholder="Enter your account"
                              defaultValue={location?.state?.userId ?? ""}
                           />
                           {formik.errors.taiKhoan &&
                              formik.touched.taiKhoan && (
                                 <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                    {formik.errors.taiKhoan}
                                 </p>
                              )}
                        </div>

                        <div className="relative mb-6">
                           <input
                              type="password"
                              name="matKhau"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`form-control block w-full max-w-[400px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none ${
                                 formik.errors.matKhau && formik.touched.matKhau
                                    ? "border-red-500 focus-within:border-red-500"
                                    : "border-gray-400 focus-within:border-primary"
                              }`}
                              placeholder="Enter your password"
                              defaultValue={location?.state?.password ?? ""}
                           />
                           {formik.errors.matKhau && formik.touched.matKhau && (
                              <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                                 {formik.errors.matKhau}
                              </p>
                           )}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center justify-center gap-2 form-group form-check">
                              <input
                                 className="w-4 h-4 cursor-pointer"
                                 type="checkbox"
                                 value={remember}
                                 onChange={() => setRemember(!remember)}
                                 id="flexCheckChecked"
                              ></input>
                              <label
                                 className="inline-block text-gray-800 form-check-label"
                                 htmlFor="exampleCheck2"
                              >
                                 Remember me
                              </label>
                           </div>
                        </div>

                        <div className="text-center lg:text-left">
                           <button
                              type="submit"
                              className={`inline-block px-10 py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-primary hover:bg-primary-dark hover:shadow-lg focus:bg-primary-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-dark active:shadow-lg ${
                                 formik.isValid ? "opacity-100" : "opacity-50"
                              }`}
                              disabled={!formik.isValid}
                           >
                              Login
                           </button>
                           <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                              Don't have an account?
                              <Link
                                 to={paths.signup}
                                 className="pl-1 text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                              >
                                 Register
                              </Link>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
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

export default Login;
