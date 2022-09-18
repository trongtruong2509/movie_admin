import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z]).{8,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const phoneRegExp =
   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signupSchema = yup.object().shape({
   hoTen: yup
      .string()
      .max(30, "Must be 30 characters or less")
      .min(5, "Must be at least 5 characters")
      .required("Required"),
   taiKhoan: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
   email: yup.string().email("Please enter a valid email").required("Required"),
   matKhau: yup
      .string()
      .min(8, "Must be at least 8 characters")
      .matches(passwordRules, {
         message: "At least 1 lower case letter, 1 numeric digit",
      })
      .required("Required"),
   soDt: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
