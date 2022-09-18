import axios from "axios";
import { BASE_URL, GROUP_ID } from "./config";

const defaultHeader = {
   accept: "application/json",
   TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
};

const httpRequest = axios.create({
   baseURL: BASE_URL,
   headers: {
      ...defaultHeader,
   },
});

export const get = async (path, params = {}, options = {}) => {
   console.log("[aaaaaaaaa]", params);
   const response = await httpRequest.get(path, {
      params: {
         maNhom: GROUP_ID,
         ...params,
      },
      ...options,
   });

   return response.data;
};

export const post = async (path, data, options = {}) => {
   const response = await httpRequest.post(path, data, {
      headers: {
         ...defaultHeader,
         Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      ...options,
   });

   // console.log("[aaaaaaaaa]", params);

   return response;
};

export const put = async (path, data, options = {}) => {
   console.log("[options]", options);
   const response = await httpRequest.put(path, data, {
      headers: {
         ...defaultHeader,
         Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      ...options,
   });
   return response.data;
};

export const Delete = async (path, payload, options = {}) => {
   console.log("[options]", options);
   const response = await httpRequest.delete(path, {
      headers: {
         ...defaultHeader,
         Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      params: {
         ...payload,
      },
      ...options,
   });
   return response.data;
};

export default httpRequest;
