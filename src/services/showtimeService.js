import * as httpRequest from "../common/utils/httpRequest";

export const getCinemaChain = async () => {
   const res = await httpRequest.get("/QuanLyRap/LayThongTinHeThongRap");

   console.log("[getCinemaChain]", res);
   return res;
};

export const getCluster = async (id) => {
   const res = await httpRequest.get(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong",
      { maHeThongRap: id }
   );

   console.log("[getCluster]", res);
   return res;
};

export const createShowtime = async (info) => {
   const res = await httpRequest.post("/QuanLyDatVe/TaoLichChieu", info);

   console.log("[createShowtime]", res);
   return res;
};
