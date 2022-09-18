import * as yup from "yup";

const linkRules =
   /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export const addFilmSchema = yup.object().shape({
   tenPhim: yup
      .string()
      .max(60, "Must be 60 characters or less")
      .min(15, "Must be at least 15 characters")
      .required("Required"),
   trailer: yup
      .string()
      .min(8, "Must be at least 8 characters")
      .matches(linkRules, {
         message: "Link format is incorrect",
      })
      .required("Required"),
   moTa: yup
      .string()
      .min(15, "Must be at least 15 characters or less")
      .required("Required"),
   ngayKhoiChieu: yup.string().required("Required"),

   // soDt: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
