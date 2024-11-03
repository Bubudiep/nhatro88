import React, { useState, useEffect } from "react";
import api from "../../../../components/api";

const Thutien_chitiet = ({ phong, handleClose, onUserUpdate, token }) => {
  const ngaychot = phong.nhatro.ngay_thu_tien ?? 15;
  let tronthang = false;
  const [isLoading, setIsloading] = useState(false);
  const [days, setDays] = useState(0);
  const [tienphong, setTienphong] = useState(0);
  const [tienrac, setTienrac] = useState(0);
  const [tiendien, setTiendien] = useState(0);
  const [tiennuoc, setTiennuoc] = useState(0);
  const [tienkhac, setTienkhac] = useState(0);
  const [total, setTotal] = useState(0);

  let ngaybd = 0;
  if (phong?.phong?.hoadon.length > 0) {
    ngaybd = phong?.phong?.hoadon[0].ngayKetthuc;
  } else {
    ngaybd = phong?.phong.Ngaybatdau;
  }
  const handleXuathoadon = () => {
    setIsloading(true);
    const formData = {
      phong: phong.phong.id,
      soTienPhong: tienphong,
      soDien: parseInt(phong.sodien),
      soNuoc: parseInt(phong.sonuoc),
      soTienDien: tiendien,
      soTienNuoc: tiennuoc,
      soTienWifi: 0,
      soTienRac: tienrac,
      soTienKhac: tienkhac,
      tongTien: total,
      ngayBatdau: ngaybd,
      ngayKetthuc: new Date(new Date().setDate(ngaychot))
        .toISOString()
        .slice(0, 10),
    };
    console.log(formData);
    const update = api
      .post(`/t-thanhtoan/`, formData, token)
      .then((response) => {
        onUserUpdate(response);
        handleClose();
      })
      .catch((error) => {
        setErrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  if (new Date(ngaybd).getDate() === ngaychot) {
    tronthang = true;
  }
  useEffect(() => {
    const calculatedDays = Math.floor(
      (new Date(new Date().setDate(ngaychot)) - new Date(ngaybd)) /
        (24 * 3600 * 1000)
    );
    setDays(calculatedDays);

    // Calculate each cost based on the number of days
    const calculatedTienphong = tronthang
      ? phong.nhatro.tienphong
      : (calculatedDays * (phong.nhatro.tienphong / 30)).toFixed(0);
    const calculatedTienrac = tronthang
      ? phong.nhatro.tienrac
      : (calculatedDays * (phong.nhatro.tienrac / 30)).toFixed(0);
    const calculatedTiendien = (
      phong.phong.tiendien *
      (phong.sodien - phong.phong.sodien)
    ).toFixed(0);
    const calculatedTiennuoc = (
      phong.phong.tiennuoc *
      (phong.sonuoc - phong.phong.sonuoc)
    ).toFixed(0);
    const calculatedTienkhac = tronthang
      ? phong.nhatro.tienkhac
      : (calculatedDays * (phong.nhatro.tienkhac / 30)).toFixed(0);

    // Set each individual cost in state
    setTienphong(parseInt(calculatedTienphong));
    setTienrac(parseInt(calculatedTienrac));
    setTiendien(parseInt(calculatedTiendien));
    setTiennuoc(parseInt(calculatedTiennuoc));
    setTienkhac(parseInt(calculatedTienkhac));

    // Calculate the total cost
    const totalAmount = [
      parseInt(calculatedTienphong),
      parseInt(calculatedTienrac),
      parseInt(calculatedTiendien),
      parseInt(calculatedTiennuoc),
      parseInt(calculatedTienkhac),
    ].reduce((sum, item) => sum + item, 0);

    setTotal(totalAmount);
  }, []);

  return (
    <div className="center_popup fade-in-5">
      <div className="detectOut" onClick={handleClose}></div>
      <div className="whitebox slider">
        <div className="title">Chi tiết tiền phòng</div>
        <div className="body">
          <div className="info-row">
            <span className="label">Phòng:</span>
            <span className="value">
              {phong.phong.soPhong} - {phong.phong.tenTang}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Nhà trọ</span>
            <span className="value">{phong.nhatro.tenTro}</span>
          </div>
          <div className="info-row">
            <span className="label">Kiểu tính</span>
            <span className="value">
              {tronthang ? "Tròn tháng" : "Lẻ ngày"}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Ngày bắt đầu</span>
            <span className="value">
              {new Date(ngaybd).toLocaleDateString()}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Ngày chốt tiền phòng</span>
            <span className="value">
              {new Date(new Date().setDate(ngaychot)).toLocaleDateString()}
            </span>
          </div>
          <table className="detail-table">
            <thead>
              <tr>
                <th>Mục</th>
                <th>Giá</th>
                <th>SL</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiền phòng</td>
                <td>
                  {phong.nhatro.tienphong.toLocaleString("vi-VN")}đ/1 tháng
                </td>
                <td>{`${days.toFixed(0)} ngày`}</td>
                <td>{tienphong.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền rác</td>
                <td>{phong.nhatro.tienrac.toLocaleString("vi-VN")}đ/1 tháng</td>
                <td>{`${days.toFixed(0)} ngày`}</td>
                <td>{tienrac.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền điện</td>
                <td>{phong.phong.tiendien.toLocaleString("vi-VN")}đ/số</td>
                <td>
                  {`${phong.sodien}-${phong.phong.sodien}=` +
                    (phong.sodien - phong.phong.sodien)}
                </td>
                <td>{tiendien.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền nước</td>
                <td>{phong.phong.tiennuoc.toLocaleString("vi-VN")}đ/khối</td>
                <td>
                  {`${phong.sonuoc}-${phong.phong.sonuoc}=` +
                    (phong.sonuoc - phong.phong.sonuoc)}
                </td>
                <td>{tiennuoc.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền khác</td>
                <td>
                  {phong.nhatro.tienkhac.toLocaleString("vi-VN")}đ/1 tháng
                </td>
                <td>{`${days.toFixed(0)} ngày`}</td>
                <td>{tienkhac.toLocaleString("vi-VN")}đ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Tổng</th>
                <th colSpan={2}></th>
                <th>{total.toLocaleString("vi-VN")}đ</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="tools">
          <div className="close" onClick={handleClose}>
            Đóng
          </div>
          <div className="confirm" onClick={handleXuathoadon}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <i class="fa-solid fa-paper-plane"></i> Gửi
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thutien_chitiet;
