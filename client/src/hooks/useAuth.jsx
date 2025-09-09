import React from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return { user };
};

export default useAuth;
