import React, { useEffect, useState } from "react";
// import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { useFormik } from "formik";
import DatePicker from "react-datepicker";

import {
   createShowtime,
   getChain,
   getClusterId,
} from "../../common/slices/showtimeSlice";
import { getFilmById } from "../../common/slices/filmSlice";
import { paths } from "../../app/routes";

import "rc-time-picker/assets/index.css";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
         moment(showTime).format("hh:mm:ss");
      formik.setFieldValue("ngayChieuGioChieu", showDateTime);
   }, [showDate, showTime]);

   const onCancel = () => {
      navigate(paths.home);
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <div className="flex-grow">
            <div className="mt-10">
               <h1 className="mt-6 mb-10 text-5xl font-semibold">
                  Create Showtime
               </h1>
               <div className="pb-4">
                  <h1 className="text-2xl">
                     Film{" "}
                     <span className="font-semibold">
                        {currentFilm?.tenPhim}
                     </span>
                  </h1>
               </div>
            </div>

            <div className="w-full mt-6">
               <form
                  className="flex flex-col w-full max-w-md gap-5"
                  onSubmit={formik.handleSubmit}
               >
                  <div className="relative flex items-center gap-3">
                     <label className="w-40 capitalize">theater </label>
                     <select
                        className="block w-full px-4 py-4 m-0 text-xl transition ease-in-out bg-transparent bg-white bg-no-repeat border border-gray-300 border-solid rounded-lg appearance-none form-select form-select-lg font-normaltext-gray-700 bg-clip-padding rounde focus:text-gray-700 focus:border-blue-600 focus:outline-none"
                        aria-label=".form-select-lg example"
                        onChange={(e) => setSelectedChainId(e.target.value)}
                     >
                        <option defaultValue>Open this select theater</option>
                        {chain &&
                           chain.map((c, index) => (
                              <option value={c.maHeThongRap} key={index}>
                                 {c.tenHeThongRap}
                              </option>
                           ))}
                     </select>
                     <MdKeyboardArrowDown className="absolute text-4xl opacity-50 top-3 right-2 -z-10" />
                  </div>
                  <div className="relative flex items-center gap-3">
                     <label className="w-40 capitalize">Cluster</label>
                     <select
                        className="block w-full px-4 py-4 m-0 text-xl transition ease-in-out bg-transparent bg-white bg-no-repeat border border-gray-300 border-solid rounded-lg appearance-none form-select form-select-lg font-normaltext-gray-700 bg-clip-padding rounde focus:text-gray-700 focus:border-blue-600 focus:outline-none"
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
                     <MdKeyboardArrowDown className="absolute text-4xl opacity-50 top-3 right-2 -z-10" />
                  </div>
                  <div className="flex items-center gap-3">
                     <label className="w-40">Date</label>
                     <DatePicker
                        selected={showDate}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => setShowDate(date)}
                        className="w-full px-4 py-4 border border-gray-400 rounded-md outline-none focus-within:border-primary"
                     />
                  </div>
                  <div className="flex items-center gap-3">
                     <label className="w-40">Time</label>
                     <TimePicker
                        label="Time"
                        value={showTime}
                        onChange={(e) => setShowTime(e)}
                        renderInput={(params) => <TextField {...params} />}
                        className="w-full"
                        toolbarTitle={false}
                     />
                  </div>
                  <div className="flex items-center gap-3 ">
                     <label className="w-36">Ticket (VND)</label>
                     <input
                        type="number"
                        name="giaVe"
                        onChange={formik.handleChange}
                        min={100000}
                        max={300000}
                        step={5000}
                        className="px-4 py-4 border border-gray-400 rounded-lg outline-none w-96 focus-within:border-primary"
                        defaultValue={135000}
                     />
                  </div>
                  <div className="flex items-center justify-end gap-6 my-12">
                     <button
                        className="px-3 py-2 text-gray-500 border border-gray-500 rounded-lg hover:text-white hover:bg-gray-500"
                        onClick={onCancel}
                     >
                        Back to Home
                     </button>
                     <button
                        type="submit"
                        className="px-3 py-2 text-white rounded-lg bg-primary"
                     >
                        Create Showtime
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </LocalizationProvider>
   );
};

export default Showtime;
