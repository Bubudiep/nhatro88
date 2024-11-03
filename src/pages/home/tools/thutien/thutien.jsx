import React, { useState, useEffect } from "react";
import api from "../../../../components/api";

const Thutien = ({ phong, handleClose, onUserUpdate, token }) => {
  console.log(phong);
  const hoadon = phong.phong.hoadon[0];
  let tronthang = false;
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const ngaybd = hoadon.ngayBatdau;
  const ngaychot = hoadon.ngayKetthuc;
  const dathu = hoadon.Chitiet.reduce(
    (sumChitiet, chitiet) => sumChitiet + chitiet.so_tien,
    0
  );
  const [sotienthu, setsotienthu] = useState(
    (hoadon.tongTien - dathu).toLocaleString("vi-VN").replaceAll(".", ",")
  );
  const [tienphong, setTienphong] = useState(phong.phong.giaPhong);
  const [tienrac, setTienrac] = useState(phong.phong.tienrac);
  const [tiendien, setTiendien] = useState(phong.phong.tiendien);
  const [tiennuoc, setTiennuoc] = useState(phong.phong.tiennuoc);
  const [tienkhac, setTienkhac] = useState(phong.phong.tienkhac);
  const [total, setTotal] = useState(0);
  const days = Math.floor(
    (new Date(ngaychot) - new Date(ngaybd)) / (24 * 3600000)
  );
  if (
    new Date(hoadon.ngayBatdau).getDate() ===
    new Date(hoadon.ngayKetthuc).getDate()
  ) {
    tronthang = true;
  }
  const handleThutienphong = () => {
    if (parseInt(sotienthu.replaceAll(",", "")) > 10000) {
      setIsloading(true);
      api
        .post(
          `/tt-phong/`,
          {
            hoadon: hoadon.id,
            sotien: sotienthu.replaceAll(",", ""),
          },
          token
        )
        .then((response) => {
          onUserUpdate(response);
          handleClose();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật:", error);
        })
        .finally(() => {
          setIsloading(false);
        });
    } else {
      setError("Số tiền không được nhỏ hơn 10,000 đồng!");
    }
  };
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
              {new Date(ngaychot).toLocaleDateString()}
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
                <td>{hoadon.soTienPhong.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền rác</td>
                <td>{phong.nhatro.tienrac.toLocaleString("vi-VN")}đ/1 tháng</td>
                <td>{`${days.toFixed(0)} ngày`}</td>
                <td>{hoadon.soTienRac.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền điện</td>
                <td>{phong.phong.tiendien.toLocaleString("vi-VN")}đ/số</td>
                <td>
                  {`${hoadon.Tieuthu.soDienKetthuc}-${hoadon.Tieuthu.soDienBatDau}=` +
                    (hoadon.Tieuthu.soDienKetthuc -
                      hoadon.Tieuthu.soDienBatDau)}
                </td>
                <td>{hoadon.soTienDien.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền nước</td>
                <td>{phong.phong.tiennuoc.toLocaleString("vi-VN")}đ/khối</td>
                <td>
                  {`${hoadon.Tieuthu.soNuocKetthuc}-${hoadon.Tieuthu.soNuocBatDau}=` +
                    (hoadon.Tieuthu.soNuocKetthuc -
                      hoadon.Tieuthu.soNuocBatDau)}
                </td>
                <td>{hoadon.soTienNuoc.toLocaleString("vi-VN")}đ</td>
              </tr>
              <tr>
                <td>Tiền khác</td>
                <td>
                  {phong.nhatro.tienkhac.toLocaleString("vi-VN")}đ/1 tháng
                </td>
                <td>{`${days.toFixed(0)} ngày`}</td>
                <td>{hoadon.soTienKhac.toLocaleString("vi-VN")}đ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Tổng</th>
                <th colSpan={2}></th>
                <th>{hoadon.tongTien.toLocaleString("vi-VN")}đ</th>
              </tr>
              {hoadon.Chitiet.length > 0 && (
                <>
                  <tr>
                    <th>Đã thu</th>
                    <th colSpan={2}></th>
                    <th>{dathu.toLocaleString("vi-VN")}đ</th>
                  </tr>
                  <tr>
                    <th>Còn lại</th>
                    <th colSpan={2}></th>
                    <th>
                      {(hoadon.tongTien - dathu).toLocaleString("vi-VN")}đ
                    </th>
                  </tr>
                </>
              )}
            </tfoot>
          </table>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="tools">
          <input
            type="text"
            value={sotienthu}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value) {
                setsotienthu(
                  parseInt(value).toLocaleString("vi-VN").replaceAll(".", ",")
                );
              } else {
                setsotienthu(0);
              }
            }}
          />
          <div className="confirm" onClick={handleThutienphong}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <i class="fa-solid fa-paper-plane"></i> Thu tiền
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thutien;
