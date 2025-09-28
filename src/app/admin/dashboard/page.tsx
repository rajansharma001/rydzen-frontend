"use client";
import React from "react";
import { useProtectedRoute } from "../../../../context/useProtected";
import Alert from "../../../../components/alertAndNotification/Alert";
import NotificarionAlert from "../../../../components/alertAndNotification/NotificarionAlert";

const Dashboard = () => {
  useProtectedRoute(["admin"]);
  return (
    <div className="w-full">
      Dashboard
      <div className="w-full flex gap-10 flex-col items-center justify-center"></div>
    </div>
  );
};

export default Dashboard;
