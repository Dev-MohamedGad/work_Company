import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormCreateUser = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط")
      .required("رقم الهاتف مطلوب"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    address: "",
    phone_number: "",
  };

  // Form submission handler
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    axios
      .post("http://172.232.193.157:8000/api/customers/", values, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        toast.success("تم إرسال النموذج بنجاح!");
        // Reset form after successful submission
        resetForm();
      })
      .catch((error) => {
        toast.error("حدث خطأ أثناء إرسال النموذج.");
        console.error("There was an error submitting the form:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="p-5 bg-gray-100 rounded-md">
      <ToastContainer />
      <h1 className="text-2xl mb-5">إنشاء مستخدم جديد</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                الاسم
              </label>
              <Field
                name="name"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                العنوان
              </label>
              <Field
                name="address"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-gray-700">
                رقم الهاتف
              </label>
              <Field
                name="phone_number"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateUser;
