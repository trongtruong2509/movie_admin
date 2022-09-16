import * as httpRequest from "../common/utils/httpRequest";

export const login = async (info) => {
   const res = await httpRequest.post("/QuanLyNguoiDung/DangNhap", info);

   console.log("[loginService]", res);
   return res;
};

export const signup = async (info) => {
   const res = await httpRequest.post("/QuanLyNguoiDung/DangKy", info);

   console.log("[signupService]", res);
   return res;
};
