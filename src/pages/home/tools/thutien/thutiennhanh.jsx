import React, { useState } from "react";

const Thutiennhanh = ({ nhatro, phong, handleDetails }) => {
  const ngay = nhatro.ngay_thu_tien ?? 15;
  let tronthang = false;
  const [sodien, setsodien] = useState(0);
  const [sonuoc, setsonuoc] = useState(0);
  let ngaybd = 0;
  if (phong?.hoadon.length > 0) {
    ngaybd = phong?.hoadon[0].ngayKetthuc;
  } else {
    ngaybd = phong.Ngaybatdau;
  }
  if (new Date(ngaybd).getDate() === ngay) {
    tronthang = true;
  }
  const handleClick = () => {
    handleDetails({ nhatro, phong, sodien, sonuoc });
  };
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
            : ngaybd &&
              new Date().getMonth() > new Date(ngaybd).getMonth() &&
              new Date(new Date().setDate(ngay)).getDate() ==
                new Date(ngaybd).getDate()
            ? `1 tháng`
            : Math.floor(
                (new Date(new Date().setDate(ngay)) - new Date(ngaybd)) /
                  (3600000 * 24)
              ) + " ngày"}
        </div>
      </div>
      <div className="i-info">
        <div className="name">Số điện (tháng trước {phong?.sodien})</div>
        <div className="value">
          <input
            type="number"
            className="input-r w-20"
            value={sodien}
            onChange={(e) => setsodien(e.target.value)}
          />
        </div>
      </div>
      <div className="i-info">
        <div className="name">Số nước (tháng trước {phong?.sonuoc})</div>
        <div className="value">
          <input
            type="number"
            className="input-r w-20"
            value={sonuoc}
            onChange={(e) => setsonuoc(e.target.value)}
          />
        </div>
      </div>
      <div className="i-info items-center">
        <div className="name font-semibold">
          {tronthang
            ? parseInt(
                (
                  nhatro.tienphong +
                  nhatro.tienrac +
                  nhatro.tienkhac +
                  nhatro.tiendien * (sodien - phong?.sodien) +
                  nhatro.tiennuoc * (sonuoc - phong?.sonuoc)
                ).toFixed(0)
              )
                .toLocaleString("vi-VN")
                .replaceAll(".", ",")
            : parseInt(
                (
                  (nhatro.tienphong / 30) *
                    Math.floor(
                      (new Date(new Date().setDate(ngay)) - new Date(ngaybd)) /
                        (24 * 3600 * 1000)
                    ) +
                  (nhatro.tienrac / 30) *
                    Math.floor(
                      (new Date(new Date().setDate(ngay)) - new Date(ngaybd)) /
                        (24 * 3600 * 1000)
                    ) +
                  (nhatro.tienkhac / 30) *
                    Math.floor(
                      (new Date(new Date().setDate(ngay)) - new Date(ngaybd)) /
                        (24 * 3600 * 1000)
                    ) +
                  nhatro.tiendien * (sodien - phong?.sodien) +
                  nhatro.tiennuoc * (sonuoc - phong?.sonuoc)
                ).toFixed(0)
              )
                .toLocaleString("vi-VN")
                .replaceAll(".", ",")}
          đ
        </div>
        <div className="value">
          <button className="bt-r p-1 text-[13px]" onClick={handleClick}>
            Chi tiết và gửi
          </button>
        </div>
      </div>
    </>
  );
};

export default Thutiennhanh;
