import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const MaintenanceReceiptForm = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    customer_id: Yup.number().required("Customer ID is required"),
    date_invoice: Yup.string().required("Date Invoice is required"),
    sku: Yup.string()
      .required("SKU is required")
      .max(255, "SKU must be less than 255 characters"),
    customer_sku: Yup.string()
      .required("Customer SKU is required")
      .max(255, "Customer SKU must be less than 255 characters"),
    serial_number: Yup.string()
      .required("Serial Number is required")
      .max(255, "Serial Number must be less than 255 characters"),
    item_desc: Yup.string().required("Item Description is required"),
    branch: Yup.number().required("Branch is required"),
    brand: Yup.number().required("Brand is required"),
    category: Yup.number().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      customer_id: "",
      date_invoice: "",
      sku: "",
      customer_sku: "",
      serial_number: "",
      item_desc: "",
      branch: "",
      brand: "",
      category: "",
      invoice_pic:''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = await fetch(
          "http://172.232.193.157:8000/maintenance/receiving-receipts/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
          }
        );
console.log(response)
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const result = await response.json();
        console.log('result',result)
        console.log("Maintenance receipt created:", result);
        toast.success("Maintenance receipt created successfully!");
        formik.resetForm(); // Optionally reset the form on success
      } catch (error) {
        console.log('error',error)
        toast.error("Error creating maintenance receipt. Please try again.");
      }
    },
  });

  const handlePhoneNumberChange = async (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);

    if (phone.length >= 3) {
      try {
        const response = await fetch(
          `http://172.232.193.157:8000/api/customers/search_by_phone/?phone_number=${phone}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching customer data.");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
      }
    }
  };

  const handleCustomerSelect = (customer) => {
    formik.setFieldValue("customer_id", customer.id);
    setPhoneNumber(customer.phone_number);
    setSearchResults([]);
  };

  return (
    <div className=" relative w-full h-full right-1/3 bg-white ">
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-lg  absolute w-2/3 overflow-scroll  mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Search Customer by Phone Number:
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {searchResults.length > 0 && (
            <ul className="border border-gray-300 rounded-md mt-2">
              {searchResults.map((customer) => (
                <li
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {customer.name} ({customer.phone_number})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4 h-0 invisible">
          <label
            htmlFor="customer_id"
            className="block text-sm font-medium text-gray-700"
          >
            Customer ID:
          </label>
          <input
            id="customer_id"
            name="customer_id"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customer_id}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.customer_id && formik.touched.customer_id ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.customer_id}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="date_invoice"
            className="block text-sm font-medium text-gray-700"
          >
            Date Invoice:
          </label>
          <input
            id="date_invoice"
            name="date_invoice"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date_invoice}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.date_invoice && formik.touched.date_invoice ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.date_invoice}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700"
          >
            SKU:
          </label>
          <input
            id="sku"
            name="sku"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sku}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.sku && formik.touched.sku ? (
            <div className="text-red-600 text-sm mt-1">{formik.errors.sku}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="customer_sku"
            className="block text-sm font-medium text-gray-700"
          >
            Customer SKU:
          </label>
          <input
            id="customer_sku"
            name="customer_sku"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customer_sku}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.customer_sku && formik.touched.customer_sku ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.customer_sku}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="serial_number"
            className="block text-sm font-medium text-gray-700"
          >
            Serial Number:
          </label>
          <input
            id="serial_number"
            name="serial_number"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serial_number}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.serial_number && formik.touched.serial_number ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.serial_number}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="item_desc"
            className="block text-sm font-medium text-gray-700"
          >
            Item Description:
          </label>
          <textarea
            id="item_desc"
            name="item_desc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.item_desc}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.item_desc && formik.touched.item_desc ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.item_desc}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Branch:
          </label>
          <input
            id="branch"
            name="branch"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.branch}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.branch && formik.touched.branch ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.branch}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand:
          </label>
          <input
            id="brand"
            name="brand"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.brand && formik.touched.brand ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.brand}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <input
            id="category"
            name="category"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {formik.errors.category && formik.touched.category ? (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.category}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MaintenanceReceiptForm;
