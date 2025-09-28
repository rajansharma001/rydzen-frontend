// app/admin/layout.tsx (NO "use client" here)
import React from "react";
import { AuthProvider } from "../../../../context/authProvider";
import { Metadata } from "next";
import "../../globals.css";
import AdminShell from "../AdminShell";

export const metadata: Metadata = {
  title: "Dashboard - Rydzen",
  description: "Car Rental Site",
  icons: {
    icon: "/RydzenIcon.png",
  },
};

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-dash-text-primary bg-dash-bg-primary">
        <AuthProvider>
          <AdminShell>{children}</AdminShell>
        </AuthProvider>
      </body>
    </html>
  );
};

export default AdminLayout;
