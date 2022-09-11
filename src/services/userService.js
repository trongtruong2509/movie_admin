import * as httpRequest from "../common/utils/httpRequest";

export const login = async (info) => {
   const res = await httpRequest.post("/QuanLyNguoiDung/DangNhap", info);

   console.log("[loginService]", res);
   return res;
};
