import React from "react";

const Chuathanhtoan = ({ phong, nhatro, handleThutien }) => {
  const handleClick = () => {
    handleThutien({ phong, nhatro });
  };
  return (
    <>
      <div className="i-info">
        <div className="name i-title">
          {phong.soPhong} -{phong.tenTang}
        </div>
        <div className="value giaphong">
          {phong?.hoadon.length > 0 ? (
            new Date(phong?.hoadon[0].created_at).getMonth() ==
            new Date().getMonth() ? (
              phong?.hoadon[0].isPaid ? (
                <div className="ispaid">Đã thanh toán</div>
              ) : (
                <div className="unpaid">Chờ thanh toán</div>
              )
            ) : (
              phong?.hoadon[0].created_at.split("T")[0]
            )
          ) : new Date(phong.Ngaybatdau).getMonth() == new Date().getMonth() ? (
            `Mới vào ${phong.Ngaybatdau.split("-")[2]} - ${
              phong.Ngaybatdau.split("-")[1]
            }`
          ) : (
            phong.Ngaybatdau &&
            Math.floor(
              (new Date() - new Date(phong.Ngaybatdau)) / (3600000 * 24)
            ) + " ngày"
          )}
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
      <div className="i-info items-center">
        <div className="name font-semibold">
          {parseInt(phong?.hoadon[0].tongTien.toFixed(0))
            .toLocaleString("vi-vn")
            .replaceAll(".", ",")}
          {"đ"}{" "}
          {phong?.hoadon[0].Chitiet.length > 0 && (
            <>
              (
              {"Đã thu " +
                phong?.hoadon[0].Chitiet.reduce(
                  (sumChitiet, chitiet) => sumChitiet + chitiet.so_tien,
                  0
                )
                  .toLocaleString("vi-vn")
                  .replaceAll(".", ",")}
              {"đ"})
            </>
          )}
        </div>
        <div className="value">
          <button
            className="bt-r thutien p-1 text-[13px]"
            onClick={handleClick}
          >
            Thu tiền
          </button>
        </div>
      </div>
    </>
  );
};

export default Chuathanhtoan;
