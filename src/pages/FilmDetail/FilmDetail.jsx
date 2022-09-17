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
            <h1 className="text-5xl font-semibold mt-6 mb-10">Film Detail</h1>
         </div>

         {film?.pending ? (
            <div className="w-full h-96 flex items-center justify-center">
               <SyncLoader
                  color="#3498DB"
                  // loading={loading}
                  cssOverride={override}
                  size={15}
               />
            </div>
         ) : (
            <div className="mt-16 w-full flex gap-10">
               <div className="flex gap-6">
                  <div className="w-80 h-auto rounded-lg">
                     {poster ? (
                        <div>
                           <img
                              src={newPoster ?? poster}
                              className="w-full object-contain rounded-lg"
                           />
                           <div className="mt-10 flex gap-5 items-center justify-center">
                              <label
                                 className="px-3 py-2 text-sm border text-primary-dark border-primary rounded-lg flex items-center gap-2 opacity-80 cursor-pointer
                           hover:bg-primary hover:text-white hover:opacity-100"
                              >
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
                                    className="px-2 py-2 text-sm text-gray-500 border border-gray-500 rounded-lg flex items-center gap-1 opacity-80
                           hover:bg-gray-500 hover:text-white hover:opacity-100"
                                    onClick={onCancelPoster}
                                 >
                                    <AiOutlineDelete className="text-xl" />
                                    Cancel Upload
                                 </button>
                              )}
                           </div>
                        </div>
                     ) : (
                        <label className="w-full h-80 flex items-center rounded-lg justify-center flex-col gap-2 text-secondary text-lg opacity-50 cursor-pointer bg-hover-1">
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
                  <div className="flex gap-6 items-center ">
                     <label className="w-24">Film Name</label>
                     <input
                        type="text"
                        name="tenPhim"
                        onChange={formik.handleChange}
                        className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                        placeholder="Film Name"
                        defaultValue={currentFilm?.tenPhim}
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
                        defaultValue={currentFilm?.trailer}
                     />
                  </div>
                  <div className="flex gap-6 items-center ">
                     <label className="w-24">Description</label>
                     <textarea
                        type="text"
                        name="moTa"
                        rows="4"
                        onChange={formik.handleChange}
                        className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none scrollbar"
                        placeholder="Short description for film"
                        defaultValue={currentFilm?.moTa}
                     />
                  </div>
                  <div className="flex gap-6 items-center">
                     <label className="w-24">Group</label>
                     <input
                        type="text"
                        name="maNhom"
                        onChange={formik.handleChange}
                        className="pl-4 py-2 border border-gray-400 rounded-lg w-32 focus-within:border-primary outline-none"
                        placeholder="Group"
                        defaultValue={currentFilm?.maNhom}
                     />
                  </div>
                  <div className="flex items-center">
                     <label className="w-40">Release Date</label>
                     <DatePicker
                        selected={releaseDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => handleDateChange(date)}
                        className="px-4 py-2 border border-gray-400 rounded-lg w-40 focus-within:border-primary outline-none"
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
                        className="pl-4 py-2 border border-gray-400 rounded-lg w-32 focus-within:border-primary outline-none"
                     />
                  </div>
                  <div className="my-12 flex gap-6 items-center justify-end">
                     <button
                        className="bg-gray-500 py-2 px-6 rounded-lg text-white"
                        onClick={onCancel}
                     >
                        Back to Home
                     </button>
                     <button
                        type="submit"
                        className="bg-primary py-2 px-6 rounded-lg text-white"
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
