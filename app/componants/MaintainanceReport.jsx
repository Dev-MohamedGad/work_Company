"use client";

import React from "react";

const MaintainanceReport = () => {
  return (
    <div className="flex flex-col flex-grow p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">تقارير صيانة</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          إنشاء التقارير
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2">Title</th>
            <th className="py-2">Category</th>
            <th className="py-2">Status</th>
            <th className="py-2">Author</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr className="text-center">
            <td className="py-2">JavaScript Variables: Understanding...</td>
            <td className="py-2">JavaScript</td>
            <td className="py-2">Published</td>
            <td className="py-2">Admin Account</td>
            <td className="py-2">
              <div className="flex justify-center space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  👁️
                </button>
                <button className="text-green-500 hover:text-green-700">
                  ✏️
                </button>
                <button className="text-red-500 hover:text-red-700">🗑️</button>
              </div>
            </td>
          </tr>
          {/* Repeat for other rows */}
        </tbody>
      </table>
    </div>
  );
};

export default MaintainanceReport;
