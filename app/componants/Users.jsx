import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormCreateUser from "./FormCreateUser"; // Ensure this import path is correct

const Users = () => {
  let [customers, setCustomers] = useState([]);
  let [showForm, setShowForm] = useState(false);

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  // Fetch customers data from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://172.232.193.157:8000/api/customers/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCustomers([response.data]);
        console.log(response.data, customers);
        toast.success("تم تحميل البيانات بنجاح!");
      } catch (error) {
        toast.error("حدث خطأ أثناء تحميل البيانات.");
        console.error("There was an error fetching the customer data:", error);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">العملاء</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={toggleForm}
        >
          {showForm ? "إغلاق النموذج" : "إنشاء عميل"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <FormCreateUser />
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2">الأسم</th>
            <th className="py-2">العنوان</th>
            <th className="py-2">رقم الفون</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length ? (
            customers.map((customer) => {
              console.log(customer);

              return (
                <tr key={customer.id} className="text-center">
                  <td className="py-2">{customer.name}</td>
                  <td className="py-2">{customer.address}</td>
                  <td className="py-2">{customer.phone_number}</td>
                  <td className="py-2">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        👁️
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        ✏️
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="py-2 text-center">
                لا يوجد عملاء حاليا. {typeof customers}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
