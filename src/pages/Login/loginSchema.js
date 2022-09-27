import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z]).{8,}$/;

export const loginSchema = yup.object().shape({
   taiKhoan: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
   matKhau: yup
      .string()
      // .min(8, "Must be at least 8 characters")
      // .matches(passwordRules, {
      //    message: "At least 1 lower case letter, 1 numeric digit",
      // })
      .required("Required"),
});
