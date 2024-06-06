"use client";
import React, { useState, useEffect } from "react";
import InvoiceForm from "../componants/FormReport";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      try {
        const response = await fetch(
          `http://172.232.193.157:8000/maintenance/report-maintenance/?page=${currentPage}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3ODY3OTU0LCJpYXQiOjE3MTc1MjIzNTQsImp0aSI6ImJiNjFhMGQxZmVhNjQ3MzU4NDhmNjViZDc5OWI4MmQzIiwidXNlcl9pZCI6Mn0.HR7AE-mqKirIq_-kQ59OjFc7H62kRhKEUF0zoIbusL4",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        setReports(data.results);
        setTotalPages(Math.ceil(data.count / 20)); // Assuming 20 reports per page
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(true); // Set loading to false in case of an error
      }
    };

    fetchReports();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <>
      {showForm ? (
        <InvoiceForm />
      ) : (
        <div className="bg-blue-50 p-8 flex justify-center">
          <div className="w-full max-w-6xl">
            <button
              className="bg-white text-blue-500 text-xl py-4 px-6 rounded-full shadow mb-4"
              onClick={() => setShowForm(true)}
            >
              إنشاء تقرير
            </button>
            <div className="overflow-auto shadow-inner rounded-3xl">
              {loading ? (
                <p className="w-full text-center p-14 text-6xl">
                  جاري التحميل...
                </p>
              ) : error ? (
                <p className="w-full text-center p-14 text-6xl">
                  هناك مشكله فى الانترنت
                </p>
              ) : (
                <>
                  <table className="table-auto w-full rounded-3xl bg-white">
                    <thead>
                      <tr className="border-b-8 border-blue-100 text-xl bg-blue-100">
                        <th className="py-4 px-4">الرقم</th>
                        <th className="px-4 py-6">تاريخ الإنشاء</th>
                        <th className="px-4 py-6">تاريخ الفاتورة</th>
                        <th className="px-4 py-6">المندوب</th>
                        <th className="px-4 py-6">رمز المنتج</th>
                        <th className="px-4 py-6">رمز المنتج للعميل</th>
                        <th className="px-4 py-6">الحالة</th>
                        <th className="px-4 py-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <React.Fragment key={report.id}>
                          <tr
                            className={`border-b-8  border-blue-50 py-8 text-center ${
                              expandedRow === report.id ? "bg-blue-50" : ""
                            }`}
                          >
                            <td className="px-4  py-4">{report.id}</td>
                            <td className="px-4 py-4">{report.create_date}</td>
                            <td className="px-4 py-4">{report.date_invoice}</td>
                            <td className="px-4 py-4">
                              {report.promoter.display_name}
                            </td>
                            <td className="px-6 py-6">{report.sku}</td>
                            <td className="px-6 py-6">{report.customer_sku}</td>
                            <td className="px-6 py-6">{"قيييد الانتظار"}</td>
                            <td className="px-6 py-6">
                              <button
                                className="bg-blue-100 text-slate-800 text-xl py-2 px-4 rounded-3xl shadow"
                                onClick={() => handleRowClick(report.id)}
                              >
                                عرض التفاصيل
                              </button>
                            </td>
                          </tr>
                          {expandedRow === report.id && (
                            <tr className="b  ">
                              <td colSpan="8">
                                <table className="table-auto w-full">
                                  <thead>
                                    <tr className="bg-blue-200">
                                      <th className="border border-white px-4 py-2">
                                        الرقم التسلسلي
                                      </th>
                                      <th className="border border-white px-4 py-2">
                                        وصف العنصر
                                      </th>
                                      <th className="border border-white px-4 py-2">
                                        عيب المنتج
                                      </th>
                                      <th className="border border-white px-4 py-2">
                                        نتيجة المنتج
                                      </th>
                                      <th className="border border-white px-4 py-2">
                                        ملاحظات
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border  border-white bg-blue-100 rounded-md px-4 py-2">
                                        {report.sn}
                                      </td>
                                      <td className="border  border-white bg-blue-100 rounded-md px-4 py-2">
                                        {report.item_desc}
                                      </td>
                                      <td className="border  border-white bg-blue-100 rounded-md px-4 py-2">
                                        {report.product_defect}
                                      </td>
                                      <td className="border  border-white bg-blue-100 rounded-md px-4 py-2">
                                        {report.product_result}
                                      </td>
                                      <td className="border  border-white bg-blue-100 rounded-md px-4 py-2">
                                        {report.notes}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-white text-blue-500 text-xl py-2 px-4 rounded-full shadow"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      السابق
                    </button>
                    <span className="text-xl">
                      {currentPage} من {totalPages}
                    </span>
                    <button
                      className="bg-white text-blue-500 text-xl py-2 px-4 rounded-full shadow"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      التالي
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
