import React, { useState, useEffect } from "react";
import FormCreateReceiving from "./FormCreateReceiving";

const ReceiveReport = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [receipts, setReceipts] = useState([]); // State to store API data

  useEffect(() => {
    // Fetch data from the API
    const fetchReceipts = async () => {
      try {
        const response = await fetch("http://172.232.193.157:8000/maintenance/receiving-receipts/",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setReceipts(data.results); // Assuming the results are in data.results
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div className="flex flex-col p-4 ml-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">فاتورة المستلمه</h1>
        <button
          onClick={toggleForm}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'X':"انشاء فاتورة"}
        </button>
      </div>
      {showForm && (
        <div className="mb-6">
          <FormCreateReceiving />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Customer ID</th>
              <th className="py-2 px-4 text-left">Date Invoice</th>
              <th className="py-2 px-4 text-left">SKU</th>
              <th className="py-2 px-4 text-left">Customer SKU</th>
              <th className="py-2 px-4 text-left">Serial Number</th>
              <th className="py-2 px-4 text-left">Item Description</th>
              <th className="py-2 px-4 text-left">Invoice Picture</th>
              <th className="py-2 px-4 text-left">Created At</th>
              <th className="py-2 px-4 text-left">Updated At</th>
              <th className="py-2 px-4 text-left">Promoter</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Branch</th>
              <th className="py-2 px-4 text-left">Brand</th>
              <th className="py-2 px-4 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length > 0 ? (
              receipts.map((receipt) => (
                <tr key={receipt.id} className="text-sm text-gray-800 border-t">
                  <td className="py-2 px-4">{receipt.id}</td>
                  <td className="py-2 px-4">{receipt.customer_id}</td>
                  <td className="py-2 px-4">{receipt.date_invoice}</td>
                  <td className="py-2 px-4">{receipt.sku}</td>
                  <td className="py-2 px-4">{receipt.customer_sku}</td>
                  <td className="py-2 px-4">{receipt.serial_number}</td>
                  <td className="py-2 px-4">{receipt.item_desc}</td>
                  <td className="py-2 px-4">
                    <img src={receipt.invoice_pic} alt="Invoice" className="h-10 w-10 object-cover mx-auto" />
                  </td>
                  <td className="py-2 px-4">{new Date(receipt.created_at).toLocaleString()}</td>
                  <td className="py-2 px-4">{new Date(receipt.updated_at).toLocaleString()}</td>
                  <td className="py-2 px-4">{receipt.promoter}</td>
                  <td className="py-2 px-4">{receipt.customer}</td>
                  <td className="py-2 px-4">{receipt.branch}</td>
                  <td className="py-2 px-4">{receipt.brand}</td>
                  <td className="py-2 px-4">{receipt.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="py-4 px-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiveReport;
