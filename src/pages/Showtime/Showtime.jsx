import React, { useEffect, useState } from "react";
// import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { useFormik } from "formik";
import SyncLoader from "react-spinners/SyncLoader";
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";

import {
   createShowtime,
   getChain,
   getClusterId,
} from "../../common/slices/showtimeSlice";
import { getFilmById } from "../../common/slices/filmSlice";
import { paths } from "../../app/routes";

import "rc-time-picker/assets/index.css";

const Showtime = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentFilm = useSelector((state) => state.film.selected);
   const chain = useSelector((state) => state.showtime.chain);
   const cluster = useSelector((state) => state.showtime.cluster);

   const [selectedChainId, setSelectedChainId] = useState("");
   const [selectedClusterId, setSelectedClusterId] = useState("");
   const [showDate, setShowDate] = useState(Date.now());
   const [showTime, setShowTime] = useState(moment());

   useEffect(() => {
      dispatch(getChain());
   }, []);

   useEffect(() => {
      if (selectedChainId) {
         console.log("[selectedChainId]", selectedChainId);
         dispatch(getClusterId(selectedChainId));
      }
   }, [selectedChainId]);

   const formik = useFormik({
      initialValues: {
         maPhim: params.id,
         ngayChieuGioChieu: "",
         maRap: "",
         giaVe: 135000,
      },
      onSubmit: (values) => {
         console.log("[submit createShowtime]", values);
         dispatch(createShowtime(values));
      },
   });

   useEffect(() => {
      formik.setFieldValue("maRap", selectedClusterId);
   }, [selectedClusterId]);

   useEffect(() => {
      console.log("[currentId]", params.id);
      dispatch(getFilmById(params.id));
   }, [params]);

   useEffect(() => {
      const showDateTime =
         moment(showDate).format("DD/MM/YYYY") +
         " " +
         moment.unix(showTime / 1000).format("hh:mm:ss");
      formik.setFieldValue("ngayChieuGioChieu", showDateTime);
   }, [showDate, showTime]);

   const onCancel = () => {
      navigate(paths.home);
   };

   return (
      <div className="flex-grow">
         <div className="mt-10">
            <h1 className="text-5xl font-semibold mt-6 mb-10">
               Create Showtime
            </h1>
            <div>
               <h1 className="text-xl">
                  Film{" "}
                  <span className="font-semibold">{currentFilm?.tenPhim}</span>
               </h1>
            </div>
         </div>

         <div className="mt-6 w-full">
            <form
               className="max-w-md w-full flex flex-col gap-5"
               onSubmit={formik.handleSubmit}
            >
               <div className="relative flex gap-3 items-center">
                  <label className="w-40 capitalize">theater </label>
                  <select
                     className="form-select form-select-lg appearance-none block w-full px-4 py-2 m-0 rounded-lg
                     text-xl font-normaltext-gray-700 bg-white bg-clip-padding bg-no-repeat bg-transparent
                     border border-solid border-gray-300 rounde transition ease-in-out
                     focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                     aria-label=".form-select-lg example"
                     onChange={(e) => setSelectedChainId(e.target.value)}
                  >
                     b<option defaultValue>Open this select theater</option>
                     {chain &&
                        chain.map((c, index) => (
                           <option value={c.maHeThongRap} key={index}>
                              {c.tenHeThongRap}
                           </option>
                        ))}
                  </select>
                  <MdKeyboardArrowDown className="absolute top-1 right-2 text-4xl opacity-50 -z-10" />
               </div>
               <div className="relative flex gap-3 items-center">
                  <label className="w-40 capitalize">Cluster</label>
                  <select
                     className="form-select form-select-lg appearance-none block w-full px-4 py-2 m-0 rounded-lg
                     text-xl font-normaltext-gray-700 bg-white bg-clip-padding bg-no-repeat bg-transparent
                     border border-solid border-gray-300 rounde transition ease-in-out
                     focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                     aria-label=".form-select-lg example"
                     onChange={(e) => setSelectedClusterId(e.target.value)}
                  >
                     <option defaultValue>Open this select cinema</option>
                     {cluster &&
                        cluster.map((c, index) => (
                           <option value={c.maCumRap} key={index}>
                              {c.tenCumRap}
                           </option>
                        ))}
                  </select>
                  <MdKeyboardArrowDown className="absolute top-1 right-2 text-4xl opacity-50 -z-10" />
               </div>
               <div className="flex items-center gap-3">
                  <label className="w-40">Date</label>
                  <DatePicker
                     selected={showDate}
                     dateFormat="dd/MM/yyyy"
                     onChange={(date) => setShowDate(date)}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-40 focus-within:border-primary outline-none"
                  />
               </div>
               <div className="flex items-center gap-3">
                  <label className="w-40">Time</label>
                  <TimePicker
                     value={showTime}
                     onChange={(e) => setShowTime(e)}
                     showSecond={false}
                     className="w-full"
                  />
               </div>
               <div className="flex gap-3 items-center ">
                  <label className="w-36">Ticket (VND)</label>
                  <input
                     type="number"
                     name="giaVe"
                     onChange={formik.handleChange}
                     min={100000}
                     max={300000}
                     step={5000}
                     className="px-4 py-2 border border-gray-400 rounded-lg w-96 focus-within:border-primary outline-none"
                     defaultValue={135000}
                  />
               </div>
               <div className="my-12 flex gap-6 items-center justify-end">
                  <button
                     className=" text-gray-500 py-2 px-3 rounded-lg border border-gray-500 hover:text-white hover:bg-gray-500"
                     onClick={onCancel}
                  >
                     Back to Home
                  </button>
                  <button
                     type="submit"
                     className="bg-primary py-2 px-3 rounded-lg text-white"
                  >
                     Create Showtime
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Showtime;
