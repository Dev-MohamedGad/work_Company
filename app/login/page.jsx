"use client";
// components/LoginForm.js
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "../componants/Loading";
import Errorform from "../componants/Errorform";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";
import { MyContext } from "../context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();
  const { settoken } = useContext(MyContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("مطلوب"),
      password: Yup.string().required("مطلوب "),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values);

        const response = await axios.post(
          "http://172.232.193.157:8000/api/login/",
          values
        );
        localStorage.setItem("token", response.data.token.access);
        settoken(localStorage.getItem("token"));
        console.log(localStorage.getItem("token"));
        toast.success("تم تسجيل الدخول بنجاح!");
        router.replace("/dashboard");
      } catch (error) {
        toast.error("فشل تسجيل الدخول. حاول مرة أخرى.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex w-full h-full bg-blue-400 justify-center items-center">
      <div className="h-2/4 w-3/4 bg-blue-200 rounded-es-3xl rounded-tr-3xl flex-col flex justify-around items-center">
        <h1 className="text-gray-700 text-center text-2xl font-bold">
          تسجيل الدخول
        </h1>

        <form onSubmit={formik.handleSubmit} className="w-full px-10">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              أسم المسخ 
            </label>
            <input
              id="username"
              placeholder="أدخل البريد الالكترونى"
              type="text"
              {...formik.getFieldProps("username")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.username && formik.errors.username ? (
              <Errorform errors={formik.errors.username} />
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              placeholder="أدخل كلمة المرور"
              type="password"
              {...formik.getFieldProps("password")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <Errorform errors={formik.errors.password} />
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            <button className="mx-2" onClick={() => {}}>
              <Link className="text-xl" href={"/register"}>
                إنشاء حساب
              </Link>
            </button>
            <button
              type="submit"
              className={`${
                !formik.dirty
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline`}
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {formik.isSubmitting ? <Loading /> : "تسجيل"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginForm;
