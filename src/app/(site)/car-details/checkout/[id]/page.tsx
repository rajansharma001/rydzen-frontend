import React from "react";
import { useProtectedRoute } from "../../../../../../context/useProtected";

const CheckOut = () => {
  useProtectedRoute(["user"]);
  return <div>CheckOut</div>;
};

export default CheckOut;
