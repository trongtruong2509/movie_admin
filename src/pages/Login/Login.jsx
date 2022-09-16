import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
   userLogin,
   updateAllow,
   updateRemember,
} from "../../common/slices/userSlice";
import { paths } from "../../app/routes";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentUser = useSelector((state) => state.user);
   const [remember, setRemember] = useState(false);

   useEffect(() => {
      if (currentUser?.allow) {
         navigate(paths.home);
         dispatch(updateAllow(false));
      }
   }, [currentUser]);

   useEffect(() => {
      dispatch(updateRemember(remember));
   }, [remember]);

   const formik = useFormik({
      initialValues: {
         taiKhoan: "",
         matKhau: "",
      },
      onSubmit: async (values) => {
         console.log("[onSubmit]", values);
         dispatch(userLogin(values));
      },
   });

   return (
      <div>
         <section className="h-screen lg:px-20 py-10">
            <div className="px-6 h-full text-gray-800">
               <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full gap-6">
                  <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                     <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample"
                     />
                  </div>
                  <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                     <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                           <input
                              type="text"
                              name="taiKhoan"
                              onChange={formik.handleChange}
                              className="form-control block w-full max-w-[400px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                              placeholder="Enter your email"
                           />
                        </div>

                        <div className="mb-6">
                           <input
                              type="password"
                              name="matKhau"
                              onChange={formik.handleChange}
                              className="form-control block w-full max-w-[400px] px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                              placeholder="Enter your password"
                           />
                        </div>

                        <div className="flex justify-between items-center mb-6">
                           <div className="form-group form-check flex gap-2 items-center justify-center">
                              <input
                                 className="h-4 w-4 cursor-pointer"
                                 type="checkbox"
                                 value={remember}
                                 onChange={() => setRemember(!remember)}
                                 id="flexCheckChecked"
                              ></input>
                              <label
                                 className="form-check-label inline-block text-gray-800"
                                 htmlFor="exampleCheck2"
                              >
                                 Remember me
                              </label>
                           </div>
                        </div>

                        <div className="text-center lg:text-left">
                           <button
                              type="submit"
                              className="inline-block px-10 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md 
                              hover:bg-primary-dark hover:shadow-lg focus:bg-primary-dark focus:shadow-lg focus:outline-none focus:ring-0 
                              active:bg-primary-dark active:shadow-lg transition duration-150 ease-in-out"
                           >
                              Login
                           </button>
                           <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                              Don't have an account?
                              <Link
                                 to={paths.signup}
                                 className="pl-1 text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
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
      </div>
   );
};

export default Login;
