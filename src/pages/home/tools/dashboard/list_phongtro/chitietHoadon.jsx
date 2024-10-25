import React from "react";

const ChitietHoadon = ({ hoadon, phong }) => {
  console.log(hoadon, phong);
  return (
    <>
      <div className="title2">{hoadon.Key}</div>
      <div className="text-[12px] text-center">
        {phong.soPhong} - {phong.tenTang}
      </div>
    </>
  );
};

export default ChitietHoadon;
