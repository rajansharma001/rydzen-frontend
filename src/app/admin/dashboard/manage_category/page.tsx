import React from "react";
import NewCategoryForm from "../../../../../components/dashboard/category/Form";
import CategoryTable from "../../../../../components/dashboard/category/CategoryTable";

const ManageCategory = () => {
  return (
    <div className="w-full">
      <NewCategoryForm />
      <CategoryTable />
    </div>
  );
};

export default ManageCategory;
