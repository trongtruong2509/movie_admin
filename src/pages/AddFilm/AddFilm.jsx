import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { MdCloudUpload } from "react-icons/md";
import DatePicker from "react-datepicker";
import moment from "moment";
import Switch from "react-switch";

import { paths } from "../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { addNewFilm, updateAllow } from "../../common/slices/filmSlice";

import "react-datepicker/dist/react-datepicker.css";
import { GROUP_ID } from "../../common/utils/config";
import { toast } from "react-toastify";
import { addFilmSchema } from "./addFilmSchema";

const AddFilm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const film = useSelector((state) => state.film);

   const [poster, setPoster] = useState(null);
   const [releaseDate, setReleaseDate] = useState(Date.now());
   const [nowShowing, setNowShowing] = useState(false);
   const [coming, setComing] = useState(false);
   const [isHot, setIsHot] = useState(false);
   const [score, setScore] = useState(0);
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: {
         tenPhim: "",
         trailer: "",
         moTa: "",
         maNhom: GROUP_ID,
         ngayKhoiChieu: moment(releaseDate).format("DD/MM/YYYY"),
         sapChieu: false,
         dangChieu: false,
         hot: false,
         danhGia: 0,
         hinhAnh: null,
      },
      validationSchema: addFilmSchema,

      onSubmit: (values) => {
         if (values.hinhAnh) {
            console.log("[submit]", values);

            let formData = new FormData();

            for (const key in values) {
               if (key === "hinhAnh") {
                  formData.append("File", values.hinhAnh, values.hinhAnh.name);
               } else {
                  formData.append(key, values[key]);
               }
            }

            dispatch(addNewFilm(formData));
         } else {
            toast.warning("Poster is empty. Please upload poster");
         }
      },
   });

   useEffect(() => {
      formik.setFieldValue("dangChieu", nowShowing);
      formik.setFieldValue("sapChieu", coming);
      formik.setFieldValue("hot", isHot);
      formik.setFieldValue("danhGia", score);
   }, [nowShowing, coming, isHot, score]);

   useEffect(() => {
      if (film?.allow) {
         navigate(paths.home);
         dispatch(updateAllow(false));
      }
   }, [film]);

   const handleDateChange = (date) => {
      setReleaseDate(date);
      const selectedDate = moment(date).format("DD/MM/YYYY");
      console.log("[date]", selectedDate);
      formik.setFieldValue("ngayKhoiChieu", selectedDate);
   };

   const handleLoadFile = async (src) => {
      console.log("[src]", src);

      let reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = (e) => {
         setPoster(e.target.result);
         formik.setFieldValue("hinhAnh", src);
      };
   };

   const onCancel = () => {
      navigate(paths.home);
   };

   return (
      <div className="flex-grow">
         <div className="mt-10">
            <h1 className="mt-6 mb-10 text-5xl font-semibold">Add New Film</h1>
         </div>

         <div className="flex w-full gap-10 mt-16">
            <div className="flex gap-6">
               <div className="h-auto rounded-lg w-80">
                  {poster ? (
                     <img src={poster} className="object-contain w-full" />
                  ) : (
                     <label className="flex flex-col items-center justify-center w-full gap-2 text-lg rounded-lg opacity-50 cursor-pointer h-80 text-secondary bg-hover-1">
                        <p className="">Click here to upload film poster</p>
                        <MdCloudUpload className="w-8 h-8" />
                        <input
                           type="file"
                           accept="image/*"
                           className="w-0 h-0"
                           onChange={(e) => handleLoadFile(e.target.files[0])}
                        />
                     </label>
                  )}
               </div>
            </div>
            <form
               className="flex flex-col gap-4"
               onSubmit={formik.handleSubmit}
            >
               <div className="flex items-center ">
                  <label className="w-40">Film Name</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="tenPhim"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-96 focus-within:border-primary ${
                           formik.errors.tenPhim && formik.touched.tenPhim
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Enter film name"
                     />
                     {formik.errors.tenPhim && formik.touched.tenPhim && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.tenPhim}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex items-center ">
                  <label className="w-40">Trailer</label>
                  <div className="relative w-full">
                     <input
                        type="text"
                        name="trailer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-96 focus-within:border-primary ${
                           formik.errors.trailer && formik.touched.trailer
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Trailer link for film"
                     />
                     {formik.errors.trailer && formik.touched.trailer && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.trailer}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex items-center ">
                  <label className="w-40">Description</label>
                  <div className="relative w-full">
                     <textarea
                        type="text"
                        name="moTa"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-4 py-2 border border-gray-400 rounded-lg outline-none w-96 focus-within:border-primary ${
                           formik.errors.moTa && formik.touched.moTa
                              ? "border-red-500 focus-within:border-red-500"
                              : "border-gray-400 focus-within:border-primary"
                        }`}
                        placeholder="Short description for film"
                     />
                     {formik.errors.moTa && formik.touched.moTa && (
                        <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                           {formik.errors.moTa}
                        </p>
                     )}
                  </div>
               </div>
               <div className="flex items-center">
                  <label className="w-40">Release Date</label>
                  <DatePicker
                     selected={releaseDate}
                     dateFormat="dd/MM/yyyy"
                     onChange={(date) => handleDateChange(date)}
                     className="w-40 px-4 py-2 border border-gray-400 rounded-lg outline-none focus-within:border-primary"
                  />
               </div>
               <div className="flex items-center ">
                  <label className="w-32">Now Showing</label>
                  <div>
                     <Switch
                        onChange={(nextChecked) => setNowShowing(nextChecked)}
                        checked={nowShowing}
                        className="react-switch"
                        height={20}
                        width={48}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                     />
                  </div>
               </div>
               <div className="flex items-center ">
                  <label className="w-32">Coming Soon</label>
                  <div>
                     <Switch
                        onChange={(nextChecked) => setComing(nextChecked)}
                        checked={coming}
                        className="react-switch"
                        height={20}
                        width={48}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                     />
                  </div>
               </div>
               <div className="flex items-center">
                  <label className="w-32">Hot</label>
                  <div>
                     <Switch
                        onChange={(nextChecked) => setIsHot(nextChecked)}
                        checked={isHot}
                        className="react-switch"
                        height={20}
                        width={48}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                     />
                  </div>
               </div>
               <div className="flex items-center">
                  <label className="w-32">Score</label>
                  <input
                     value={score}
                     onChange={(e) => setScore(e.target.value)}
                     min="0"
                     max="10"
                     type="number"
                     className="w-32 py-2 pl-4 border border-gray-400 rounded-lg outline-none focus-within:border-primary"
                  />
               </div>
               <div className="flex items-center justify-end gap-6 my-12">
                  <button
                     className="px-6 py-2 text-white bg-gray-500 rounded-lg"
                     onClick={onCancel}
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
                     Add Film
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddFilm;
