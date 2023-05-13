import { useState, useEffect } from "react";
export const useToken = () => {
  const [token, setToken] = useState("1");
  const gettoken = () => {
    return localStorage.getItem("token");
  };
  useEffect(() => {
    setToken(gettoken());
  }, []);
  return { token };
};
