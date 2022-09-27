import axios from "axios";
import { ACCESS_TOKEN, BASE_URL, GROUP_ID, TOKEN } from "./config";

const defaultHeader = {
   accept: "application/json",
   TokenCybersoft: TOKEN,
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
         Authorization:
            "Bearer " + localStorage.getItem("accessToken") ?? ACCESS_TOKEN,
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
         Authorization:
            "Bearer " + localStorage.getItem("accessToken") ?? ACCESS_TOKEN,
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
         Authorization:
            "Bearer " + localStorage.getItem("accessToken") ?? ACCESS_TOKEN,
      },
      params: {
         ...payload,
      },
      ...options,
   });
   return response;
};

export default httpRequest;
