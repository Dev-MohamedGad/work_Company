"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "../componants/Loading";
import Errorform from "../componants/Errorform";
import { useRouter } from "next/navigation";



const RegisterForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password2: "",
      tc: true,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("الاميل غير صحيح").required("مطلوب"),
      name: Yup.string().required("مطلوب"),
      password: Yup.string()
        .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
        .required("مطلوب"),
      password2: Yup.string()
        .oneOf([Yup.ref('password')], "كلمات المرور غير متطابقة")
        .required("مطلوب"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("http://172.232.193.157:8000/api/register/", {
          name: values.name,
          email: values.email,
          password: values.password,
          password2: values.password2,
          tc: values.tc,
        }).then(()=>router.push("/dashboard")
      );

        // Handle successful registration
      } catch (error) {
        // Handle registration error
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex w-full h-full bg-blue-400 justify-center items-center">
      <div className="p-4 w-3/4 bg-blue-200 rounded-es-3xl rounded-tr-3xl flex-col flex justify-center items-center">
        <h1 className="text-gray-700 text-center text-2xl font-bold">
          إنشاء حساب 
        </h1>

        <form onSubmit={formik.handleSubmit} className="w-full mt-2 px-10">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              الأميل
            </label>
            <input
              id="email"
              placeholder="أدخل البريد الالكتروني"
              type="email"
              {...formik.getFieldProps("email")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <Errorform errors={formik.errors.email} />
            ) : null}
          </div>

          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              الاسم
            </label>
            <input
              id="name"
              placeholder="أدخل اسمك"
              type="text"
              {...formik.getFieldProps("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.name && formik.errors.name ? "border-red-500" : ""
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <Errorform errors={formik.errors.name} />
            ) : null}
          </div>

          <div className="mb-2">
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
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <Errorform errors={formik.errors.password} />
            ) : null}
          </div>

          <div className="">
            <label
              htmlFor="password2"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              تأكيد كلمة المرور
            </label>
            <input
              id="password2"
              placeholder="أعد إدخال كلمة المرور"
              type="password"
              {...formik.getFieldProps("password2")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.password2 && formik.errors.password2 ? "border-red-500" : ""
              }`}
            />
            {formik.touched.password2 && formik.errors.password2 ? (
              <Errorform errors={formik.errors.password2} />
            ) : null}
          </div>

          <div className="flex items-center mt-4 justify-center">
            <button
              type="submit"
              className={`${
                !formik.dirty ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline`}
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {formik.isSubmitting ? <Loading /> : "تسجيل"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
