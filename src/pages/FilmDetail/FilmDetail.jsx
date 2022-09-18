import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import { MdCloudUpload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import SyncLoader from "react-spinners/SyncLoader";
import DatePicker from "react-datepicker";
import moment from "moment";
import Switch from "react-switch";

import { paths } from "../../app/routes";
import { getFilmById, updateFilm } from "../../common/slices/filmSlice";
import { GROUP_ID } from "../../common/utils/config";
import { addFilmSchema } from "./filmSchema";

const override = {
   display: "block",
   margin: "0 auto",
   borderColor: "red",
};

const FilmDetail = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = useParams();

   const film = useSelector((state) => state.film);
   const currentFilm = useSelector((state) => state.film.selected);

   const [poster, setPoster] = useState(currentFilm?.hinhAnh ?? "");
   const [newPoster, setNewPoster] = useState(null);
   const [releaseDate, setReleaseDate] = useState(Date.now());
   const [nowShowing, setNowShowing] = useState(
      currentFilm?.dangChieu ?? false
   );
   const [coming, setComing] = useState(currentFilm?.sapChieu ?? false);
   const [isHot, setIsHot] = useState(currentFilm?.hot ?? false);
   const [score, setScore] = useState(currentFilm?.danhGia ?? 0);

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
         console.log("[submit]", values);

         let formData = new FormData();

         for (const key in values) {
            if (key === "hinhAnh" && newPoster) {
               formData.append("File", values.hinhAnh, values.hinhAnh.name);
            } else {
               formData.append(key, values[key]);
            }
         }

         dispatch(updateFilm(formData));
      },
   });

   useEffect(() => {
      console.log("[currentId]", params.id);
      dispatch(getFilmById(params.id));
   }, [params]);

   useEffect(() => {
      if (currentFilm) {
         for (const key in currentFilm) {
            formik.setFieldValue(key, currentFilm[key]);
         }
      }

      setPoster(currentFilm?.hinhAnh);
      setNowShowing(currentFilm?.dangChieu);
      setComing(currentFilm?.sapChieu);
      setIsHot(currentFilm?.hot);
      setScore(currentFilm?.danhGia);
   }, [currentFilm]);

   useEffect(() => {
      formik.setFieldValue("dangChieu", nowShowing);
      formik.setFieldValue("sapChieu", coming);
      formik.setFieldValue("hot", isHot);
      formik.setFieldValue("danhGia", score);
   }, [nowShowing, coming, isHot, score]);

   const handleLoadFile = async (src) => {
      console.log("[src]", src);

      let reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = (e) => {
         setNewPoster(e.target.result);
         formik.setFieldValue("hinhAnh", src);
      };
   };

   const handleDateChange = (date) => {
      setReleaseDate(date);
      const selectedDate = moment(date).format("DD/MM/YYYY");
      console.log("[date]", selectedDate);
      formik.setFieldValue("ngayKhoiChieu", selectedDate);
   };

   const onCancelPoster = () => {
      setNewPoster(null);
      formik.setFieldValue("hinhAnh", currentFilm.hinhAnh);
   };

   const onCancel = () => {
      navigate(paths.home);
   };

   return (
      <div className="flex-grow">
         <div className="mt-10">
            <h1 className="mt-6 mb-10 text-5xl font-semibold">Film Detail</h1>
         </div>

         {film?.pending ? (
            <div className="flex items-center justify-center w-full h-96">
               <SyncLoader color="#3498DB" cssOverride={override} size={15} />
            </div>
         ) : (
            <div className="flex w-full gap-10 mt-16">
               <div className="flex gap-6">
                  <div className="h-auto rounded-lg w-80">
                     {poster ? (
                        <div>
                           <img
                              src={newPoster ?? poster}
                              className="object-contain w-full rounded-lg"
                           />
                           <div className="flex items-center justify-center gap-5 mt-10">
                              <label className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg cursor-pointer text-primary-dark border-primary opacity-80 hover:bg-primary hover:text-white hover:opacity-100">
                                 <MdCloudUpload className="text-xl" />
                                 New
                                 <input
                                    type="file"
                                    accept="image/png, image/gif, image/jpg"
                                    className="w-0 h-0"
                                    onChange={(e) =>
                                       handleLoadFile(e.target.files[0])
                                    }
                                 />
                              </label>
                              {newPoster && (
                                 <button
                                    className="flex items-center gap-1 px-2 py-2 text-sm text-gray-500 border border-gray-500 rounded-lg opacity-80 hover:bg-gray-500 hover:text-white hover:opacity-100"
                                    onClick={onCancelPoster}
                                 >
                                    <AiOutlineDelete className="text-xl" />
                                    Cancel Upload
                                 </button>
                              )}
                           </div>
                        </div>
                     ) : (
                        <label className="flex flex-col items-center justify-center w-full gap-2 text-lg rounded-lg opacity-50 cursor-pointer h-80 text-secondary bg-hover-1">
                           <p className="">Click here to upload film poster</p>
                           <MdCloudUpload className="w-8 h-8" />
                           <input
                              type="file"
                              accept="image/png, image/gif, image/jpg"
                              className="w-0 h-0"
                              onChange={(e) =>
                                 handleLoadFile(e.target.files[0])
                              }
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
                           defaultValue={currentFilm?.tenPhim}
                        />
                        {formik.errors.tenPhim && formik.touched.tenPhim && (
                           <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                              {formik.errors.tenPhim}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="flex items-center">
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
                           defaultValue={currentFilm?.trailer}
                        />
                        {formik.errors.trailer && formik.touched.trailer && (
                           <p className="absolute left-0 text-xs text-red-600 -bottom-4">
                              {formik.errors.trailer}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="flex items-center">
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
                           defaultValue={currentFilm?.moTa}
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
                           onChange={(nextChecked) =>
                              setNowShowing(nextChecked)
                           }
                           checked={nowShowing ?? false}
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
                           checked={coming ?? false}
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
                           checked={isHot ?? false}
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
                        value={score ?? 0}
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
                        Back to Home
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
                        Update Film
                     </button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default FilmDetail;
