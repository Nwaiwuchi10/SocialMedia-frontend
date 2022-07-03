import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOUt = () => {
  const navigate = useNavigate();
  let userout = localStorage.setItem("userId", "");

  useEffect(() => {
    if (userout) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [navigate, userout]);

  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("email", "");
    localStorage.setItem("pic", "");
    localStorage.setItem("PostDetails");

    navigate("/");
  };
  return (
    <div>
      <p onClick={logout}> Log Out</p>
    </div>
  );
};

export default LogOUt;
