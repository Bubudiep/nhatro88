import React, { useEffect } from "react";

const Doanh_thu = ({ handleClose }) => {
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Đóng");
      handleClose();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      history.pushState(null, "", window.location.href);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <>
      <div className="title2">Doanh thu</div>
      <div className="chitiet-phongtro body-container">
        <div className="null">
          <div className="icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <div className="value">Đang phát triển</div>
        </div>
      </div>
    </>
  );
};

export default Doanh_thu;
