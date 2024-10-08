import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "zmp-ui";

const NhatroHome = () => {
  return (
    <div className="nhatroHome-container">
      <Outlet />
    </div>
  );
};

export default NhatroHome;
