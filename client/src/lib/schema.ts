import * as Yup from "yup";

export const loginValues = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export const signupValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  username: ""
}

export const signupSchema = Yup.object().shape({
  name: Yup.string()
   .required("Name is required"),
  email: Yup.string()
   .email("Invalid email address")
   .required("Email is required"),
  password: Yup.string()
   .min(8, "Password must be at least 8 characters long")
   .required("Password is required"),
  username: Yup.string()
   .min(3, "Username must be at least 3 characters long")
   .required("Username is required"),
   confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null!], 'Passwords must match'),
})
