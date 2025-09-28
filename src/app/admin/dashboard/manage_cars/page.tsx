import React from "react";
import CarForm from "../../../../../components/dashboard/car/CarForm";
import CarTable from "../../../../../components/dashboard/car/CarTable";

const ManageCars = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <CarForm />
      <CarTable />
    </div>
  );
};

export default ManageCars;
