import axios from "axios";
import { BASE_URL, GROUP_ID } from "./config";

const httpRequest = axios.create({
   baseURL: BASE_URL,
   headers: {
      TokenCybersoft:
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
      // Authorization: "Bearer " + localStorage.getItem("accessToken"),
   },
});

export const get = async (path, params, options = {}) => {
   const response = await httpRequest.get(path, {
      params: {
         maNhom: GROUP_ID,
         ...params,
      },
      ...options,
   });
   return response.data;
};

export const post = async (path, options = {}) => {
   console.log("[options]", options);
   const response = await httpRequest.post(path, options);
   return response.data;
};

export default httpRequest;
