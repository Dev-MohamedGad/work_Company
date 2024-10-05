"use client";
import React, { useState } from "react";
import MaintainanceReport from "../componants/MaintainanceReport";
import ReceiveReport from "../componants/ReceiveReport";
import Users from "../componants/Users";

import "@fontsource/cairo"; // Importing the Cairo font

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState("");

  return (
    <div className="flex w-full h-full ">
      <div className="bg-slate-800 rounded flex items-center text-lg h-full text-slate-100 text-center">
        <ul>
          <li
            className="py-5 hover:bg-blue-400 cursor-pointer rounded-3xl"
            onClick={() => setActiveRoute("receiveReport")}
            role="button"
            aria-label="Receive Report"
          >
            الاجهزة المستلمة
          </li>
          <li
            className="p-5 rounded-3xl cursor-pointer hover:bg-blue-400"
            onClick={() => setActiveRoute("MaintainanceReport")}
            role="button"
            aria-label="Maintenance Report"
          >
            تقارير الصيانه
          </li>
          <li
            className="p-5 rounded-3xl cursor-pointer hover:bg-blue-400"
            onClick={() => setActiveRoute("Users")}
            role="button"
            aria-label="Users"
          >
            العملاء
          </li>
        </ul>
      </div>

      {activeRoute === "MaintainanceReport" && <MaintainanceReport />}
      {activeRoute === "receiveReport" && <ReceiveReport />}
      {activeRoute === "Users" && <Users />}
    </div>
  );
};

export default Dashboard;
