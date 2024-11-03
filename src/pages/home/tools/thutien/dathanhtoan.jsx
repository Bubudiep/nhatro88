import React from "react";

const Dathanhtoan = ({ phong }) => {
  return (
    <>
      <div className="i-info">
        <div className="name i-title">
          {phong.soPhong} -{phong.tenTang}
        </div>
        <div className="value giaphong">
          {phong?.hoadon.length > 0
            ? new Date(phong?.hoadon[0].created_at).getMonth() ==
              new Date().getMonth()
              ? phong?.hoadon[0].isPaid
                ? `Đã thanh toán`
                : `Đang chờ thanh toán`
              : phong?.hoadon[0].created_at.split("T")[0]
            : new Date(phong.Ngaybatdau).getMonth() == new Date().getMonth()
            ? `Mới vào ${phong.Ngaybatdau.split("-")[2]} - ${
                phong.Ngaybatdau.split("-")[1]
              }`
            : phong.Ngaybatdau &&
              Math.floor(
                (new Date() - new Date(phong.Ngaybatdau)) / (3600000 * 24)
              ) + " ngày"}
        </div>
      </div>
      <div className="i-info">
        <div className="name">Số điện</div>
        <div className="value">
          {phong?.hoadon[0].Tieuthu.soDienKetthuc -
            phong?.hoadon[0].Tieuthu.soDienBatDau +
            " số"}
        </div>
      </div>
      <div className="i-info">
        <div className="name">Số nước</div>
        <div className="value">
          {phong?.hoadon[0].Tieuthu.soNuocKetthuc -
            phong?.hoadon[0].Tieuthu.soNuocBatDau +
            " số"}
        </div>
      </div>
      <div className="i-info">
        <div className="name">Tổng tiền phòng</div>
        <div className="value">
          {parseInt(
            phong?.hoadon
              ?.reduce((sumHoadon, hoadon) => {
                const sumChitiet = hoadon.Chitiet?.reduce(
                  (sumChitiet, chitiet) => sumChitiet + chitiet.so_tien,
                  0
                );
                return sumHoadon + sumChitiet;
              }, 0)
              .toFixed(0)
          )
            .toLocaleString("vi-vn")
            .replaceAll(".", ",")}
          {"đ"}
        </div>
      </div>
    </>
  );
};

export default Dathanhtoan;
