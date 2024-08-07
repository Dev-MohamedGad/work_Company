import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loading from "./Loading";
import Errorform from "./Errorform";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceForm = () => {
  const [isFormVisible, setFormVisible] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      date_invoice: new Date().toISOString().split("T")[0], // Initialize with current date as string
      sku: "",
      customer_sku: "",
      sn: "",
      item_desc: "",
      product_defect: "",
      product_result: "",
      notes: "",
    },
    validationSchema: Yup.object({
      date_invoice: Yup.string()
        .required("مطلوب")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "تاريخ غير صالح"),
      sku: Yup.string()
        .required("مطلوب")
        .max(255, "الرمز يجب أن يكون أقل من 255 حرفًا"),
      customer_sku: Yup.string()
        .required("مطلوب")
        .max(250, "الرمز يجب أن يكون أقل من 250 حرفًا"),
      sn: Yup.string()
        .required("مطلوب")
        .max(250, "الرقم التسلسلي يجب أن يكون أقل من 250 حرفًا"),
      item_desc: Yup.string()
        .required("مطلوب")
        .max(250, "الوصف يجب أن يكون أقل من 250 حرفًا"),
      product_defect: Yup.string()
        .required("مطلوب")
        .max(250, "الوصف يجب أن يكون أقل من 250 حرفًا"),
      product_result: Yup.string()
        .required("مطلوب")
        .max(250, "النتيجة يجب أن تكون أقل من 250 حرفًا"),
      notes: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post(
          "http://172.232.193.157:8000/maintenance/report-maintenance/",
          values,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3ODY3OTU0LCJpYXQiOjE3MTc1MjIzNTQsImp0aSI6ImJiNjFhMGQxZmVhNjQ3MzU4NDhmNjViZDc5OWI4MmQzIiwidXNlcl9pZCI6Mn0.HR7AE-mqKirIq_-kQ59OjFc7H62kRhKEUF0zoIbusL4",
            },
          }
        );
        setFormVisible(false);
        window.location.reload();
      } catch (error) {
        // Handle form submission error
        console.error("Error submitting form", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isFormVisible) return null;

  return (
    <div className="flex min-h-screen bg-blue-50 justify-center items-center p-4">
      <div className="bg-blue-200 rounded-es-3xl rounded-tr-3xl flex-col flex justify-around items-center w-full max-w-3xl p-8 max-h-full overflow-y-auto relative">
        <h1 className="text-gray-700 text-center text-3xl font-bold mb-8">
          نموذج الفاتورة
        </h1>
        <button
          onClick={() => {
            window.location.reload();
            setFormVisible(false);
          }}
          className="absolute top-4 left-4 text-3xl bg-red-300 text-white rounded-full px-4 py-2 hover:bg-red-700 focus:outline-none"
        >
          X
        </button>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "SKU", id: "sku", type: "text", placeholder: "أدخل SKU" },
              {
                label: "رمز SKU العميل",
                id: "customer_sku",
                type: "text",
                placeholder: "أدخل رمز SKU العميل",
              },
              {
                label: "الرقم التسلسلي",
                id: "sn",
                type: "text",
                placeholder: "أدخل الرقم التسلسلي",
              },
              {
                label: "وصف العنصر",
                id: "item_desc",
                type: "text",
                placeholder: "أدخل وصف العنصر",
              },
              {
                label: "وصف العيب",
                id: "product_defect",
                type: "text",
                placeholder: "أدخل وصف العيب",
              },
              {
                label: "نتيجة الصيانة",
                id: "product_result",
                type: "text",
                placeholder: "أدخل نتيجة الصيانة",
              },
              {
                label: "ملاحظات",
                id: "notes",
                type: "text",
                placeholder: "أدخل الملاحظات",
              },
            ].map((field) => (
              <div key={field.id} className="mb-4">
                <label
                  htmlFor={field.id}
                  className="block text-gray-700 text-lg font-bold mb-2"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  placeholder={field.placeholder}
                  type={field.type}
                  {...formik.getFieldProps(field.id)}
                  className={`shadow appearance-none border rounded-xl w-full py-2 px-3 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched[field.id] && formik.errors[field.id]
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched[field.id] && formik.errors[field.id] ? (
                  <Errorform errors={formik.errors[field.id]} />
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`${
                !formik.dirty
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white text-2xl font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline`}
              disabled={formik.isSubmitting || !formik.dirty}
            >
              {formik.isSubmitting ? <Loading /> : "إنشاء فاتورة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
