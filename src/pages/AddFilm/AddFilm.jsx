import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdCloudUpload } from "react-icons/md";
import DatePicker from "react-datepicker";
import Switch from "react-switch";
import * as httpRequest from "../../common/utils/httpRequest";
import { paths } from "../../app/routes";

import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import moment from "moment";

const AddFilm = () => {
   const navigate = useNavigate();

   const [poster, setPoster] = useState(null);
   const [startDate, setStartDate] = useState(new Date());
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
         maNhom: "",
         ngayKhoiChieu: moment(Date.now()).format("DD/MM/YYYY"),
         sapChieu: false,
         dangChieu: false,
         hot: false,
         danhGia: 0,
         hinhAnh: null,
      },
      onSubmit: (values) => {
         console.log("[submit]", values);
      },
   });

   useEffect(() => {
      formik.setFieldValue("dangChieu", nowShowing);
      formik.setFieldValue("sapChieu", coming);
      formik.setFieldValue("hot", isHot);
      formik.setFieldValue("danhGia", score);
   }, [nowShowing, coming, isHot, score]);

   const handleDateChange = (date) => {
      console.log("[date]", moment(date).format("DD/MM/YYYY"));
   };

   const handleLoadFile = async (src) => {
      console.log("[src]", src);

      let reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = (e) => {
         setPoster(e.target.result);
         formik.setFieldValue("hinhAnh", e.target.result);
      };
   };

   const onAddNew = () => {};

   const onCancel = () => {
      navigate(paths.home);
   };

   return (
      <div className="flex-grow">
         <div className="mt-10">
            <h1 className="text-5xl font-semibold mt-6 mb-10">Add New Film</h1>
         </div>

         <div className="mt-16 w-full flex gap-10">
            <div className="flex gap-6">
               <div className="w-80 h-auto rounded-lg">
                  {poster ? (
                     <img src={poster} className="w-full object-contain" />
                  ) : (
                     <label className="w-full h-80 flex items-center justify-center flex-col gap-2 text-secondary text-lg opacity-50 cursor-pointer bg-hover-1">
                        <p className="">Click here to upload film poster</p>
                        <MdCloudUpload className="w-8 h-8" />
                        <input
                           type="file"
                           accept="image/png, image/gif, image/jpg"
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
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Film Name</label>
                  <input
                     type="text"
                     name="tenPhim"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Film Name"
                  />
               </div>
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Trailer</label>
                  <input
                     type="text"
                     name="trailer"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Trailer link for film"
                  />
               </div>
               <div className="flex gap-6 items-center ">
                  <label className="w-24">Description</label>
                  <textarea
                     type="text"
                     name="moTa"
                     rows="4"
                     onChange={formik.handleChange}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     placeholder="Short description for film"
                  />
               </div>
               <div className="flex gap-6 items-center">
                  <label className="w-24">Group</label>
                  <input
                     type="text"
                     name="danhGia"
                     onChange={formik.handleChange}
                     className="pl-4 py-2 border border-gray-400 rounded-lg w-32 focus-within:border-primary outline-none"
                     placeholder="Group"
                     defaultValue="GP01"
                  />
               </div>
               <div className="flex items-center">
                  <label className="w-40">Release Date</label>
                  <DatePicker
                     selected={startDate}
                     dateFormat="dd/MM/yyyy"
                     onChange={(date) => handleDateChange(date)}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-40 focus-within:border-primary outline-none"
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
                     className="pl-4 py-2 border border-gray-400 rounded-lg w-32 focus-within:border-primary outline-none"
                  />
               </div>
               <div className="my-12 flex gap-6 items-center justify-end">
                  <button
                     className="bg-gray-500 py-2 px-6 rounded-lg text-white"
                     onClick={onCancel}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="bg-primary py-2 px-6 rounded-lg text-white"
                     // onClick={() => formik.onSubmit()}
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
