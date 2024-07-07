"use client";
import React, { useState, useEffect, useContext } from "react";
import InvoiceForm from "../componants/FormReport";
import { useJwt } from "react-jwt";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", options);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", options);
  };
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      if (localStorage.getItem("token"))
        try {
          const response = await fetch(
            `http://172.232.193.157:8000/maintenance/report-maintenance/?page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();

          setReports(data.results);
          setTotalPages(Math.ceil(data.count / 20)); // Assuming 20 reports per page
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          toast.error("فشل فى جمع التقارير. حاول مرة أخرى.");
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
          <div className="w-full max-w-7xl">
            <div className="flex justify-between items-center">
              <button
                className="bg-white text-blue-500 text-xl py-4 px-6 rounded-full shadow mb-4"
                onClick={() => setShowForm(true)}
              >
                إنشاء تقرير
              </button>
              <div className="bg-white w-12 h-12 m-4 rounded-full"></div>
            </div>
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
                        <th className="px-4 py-6">المندوب</th>
                        <th className="px-4 py-6">رمز المنتج</th>
                        <th className="px-4 py-6">رمز المنتج للعميل</th>
                        <th className="px-4 py-6">الحالة</th>
                        <th className="px-4 py-6"></th>
                        <th className="px-4 py-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <React.Fragment key={report.id}>
                          <tr
                            className={`border-b-8 rounded-3xl border-blue-50 py-8 text-center ${
                              expandedRow === report.id ? "bg-blue-50" : ""
                            }`}
                          >
                            <td className="px-4  py-4 text-2xl">{report.id}</td>
                            <td className="px-4 py-4 text-2xl">
                              {formatDateTime(report.create_date)}
                            </td>
                            <td className="px-4 py-4 text-2xl">
                              {report.promoter.display_name}
                            </td>
                            <td className="px-6 py-6 text-2xl">{report.sku}</td>
                            <td className="px-6 py-6 text-2xl">
                              {report.customer_sku}
                            </td>
                            <td className="px-6 py-6 text-2xl">
                              {report.status}
                            </td>
                            <td className="px-6 py-6">
                              <button
                                className="bg-blue-100 text-slate-800 text-xl py-2 px-4 rounded-3xl shadow"
                                onClick={() => handleRowClick(report.id)}
                              >
                                عرض التفاصيل
                              </button>
                            </td>
                            {decodedToken?.type ==="team_leader" ||decodedToken?.type === 'admin' ? (
                              <td className="px-6 py-6">
                                <button
                                  className="bg-blue-100 text-slate-800 text-xl py-2 px-4 rounded-3xl shadow"
                                  onClick={() => handleRowClick(report.id)}
                                >
                                  تاكيد التقرير
                                </button>
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>

                          {expandedRow === report.id && (
                            <tr className="bg-blue-100 ">
                              <td colSpan="8">
                                <table className="table-auto w-full">
                                  <thead>
                                    <tr className="bg-blue-200">
                                      <th className="border border-white px-4 py-2 text-xl ">
                                        الرقم التسلسلي
                                      </th>
                                      <th className="border border-white px-4 py-2 text-xl">
                                        وصف العنصر
                                      </th>
                                      <th className="px-4 py-6">
                                        تاريخ الفاتورة
                                      </th>

                                      <th className="border border-white px-4 py-2 text-xl">
                                        عيب المنتج
                                      </th>
                                      <th className="border border-white px-4 py-2 text-xl">
                                        نتيجة المنتج
                                      </th>
                                      <th className="border border-white px-4 py-2 text-xl">
                                        ملاحظات
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border border-white px-4 py-2 text-2xl">
                                        {report.sn}
                                      </td>
                                      <td className="border border-white px-4 py-2 text-2xl">
                                        {report.item_desc}
                                      </td>

                                      <td className="px-4 py-4 text-2xl">
                                        {formatDate(report.date_invoice)}
                                      </td>
                                      <td className="border border-white px-4 py-2 text-2xl">
                                        {report.product_defect}
                                      </td>
                                      <td className="border border-white px-4 py-2 text-2xl">
                                        {report.product_result}
                                      </td>
                                      <td className="border border-white px-4 py-2 text-2xl">
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
                  <div className=" flex items-center justify-between w-full mt-4">
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
