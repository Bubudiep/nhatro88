import React, { useEffect, useState } from "react";
import money from "../../../../../img/banknotes_12748234.png";

const Details_phong = ({
  phong,
  handleBack,
  handleThanhtoan,
  handleCapnhap,
  handleHoadon,
}) => {
  const [hoadon, setHoadon] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [isThanhtoan, setIsThanhtoan] = useState(false);
  const [tienrac, settienrac] = useState(0);
  const [ngaybatdau, setngaybatdau] = useState(0);
  const [tiencoc, settiencoc] = useState(0);
  const [tienno, settienno] = useState(0);
  useEffect(() => {
    console.log(phong);
    let dbatdau = null;
    let tongcoc = 0;
    let countNo = 0;
    phong.Nguoitro.forEach((nguoi) => {
      tongcoc += nguoi.tiencoc;
      if (dbatdau) {
        if (new Date(nguoi.ngayBatdauO) < new Date(dbatdau)) {
          dbatdau = new Date(nguoi.ngayBatdauO);
        }
      } else {
        dbatdau = new Date(nguoi.ngayBatdauO);
      }
    });
    phong.hoadon.forEach((hoadon) => {
      if (hoadon.isPaid == false) {
        setIsPaying(true);
        countNo +=
          hoadon.tongTien -
          hoadon.Chitiet.reduce((sum, chitiet) => {
            return sum + chitiet.so_tien;
          }, 0);
      }
      if (dbatdau) {
        if (new Date(hoadon.ngayKetthuc) > new Date(dbatdau)) {
          dbatdau = new Date(hoadon.ngayKetthuc);
        }
      } else {
        dbatdau = new Date(hoadon.ngayKetthuc);
      }
    });
    setngaybatdau(dbatdau?.toISOString().split("T")[0]);
    settienno(countNo);
    settiencoc(tongcoc);
  }, []);
  const chitietHoadon = (e) => {
    handleHoadon(e);
  };
  return (
    <>
      <div className="title2">
        {phong.soPhong} ({phong.tenTang})
      </div>
      <div className="body-container overflow-auto">
        <div className="chitiet-phongtro">
          <div className="doanhthu">
            <div className="logo">
              <img src={money} />
            </div>
            <div className="value">
              {parseInt(phong.giaPhong).toLocaleString("vi-VN")} VNĐ
            </div>
            <div className="details">
              <div className={`items ${phong.wifi ? "on" : "off"}`}>
                {phong.wifi ? "Có" : "Không"} Wifi
              </div>
              <div className={`items ${phong.dieuhoa ? "on" : "off"}`}>
                {phong.dieuhoa ? "Có" : "Không"} Điều hòa
              </div>
              <div className={`items ${phong.nonglanh ? "on" : "off"}`}>
                {phong.nonglanh ? "Có" : "Không"} Nóng lạnh
              </div>
            </div>
          </div>
          {isPaying && (
            <>
              <div className="form-update">
                <div className="h3 pt-1 pb-1">
                  <div className="name">
                    <i className="fa-solid fa-user-group"></i> Phiếu tồn
                  </div>
                </div>
                <div className="list-group">
                  {phong.hoadon.map((hd) => (
                    <div
                      key={hd.id}
                      className="items"
                      onClick={() => chitietHoadon(hd)}
                    >
                      <div className="user-info">
                        <div className="it-1">
                          <div className="name key">{hd.Key}</div>
                          <div className="value money">
                            {(
                              hd.tongTien -
                              hd.Chitiet.reduce((sum, chitiet) => {
                                return sum + chitiet.so_tien;
                              }, 0)
                            ).toLocaleString("vi-VN")}{" "}
                            đ
                          </div>
                        </div>
                        <div className="it-2">
                          <div className="name">Tổng</div>
                          <div className="value">
                            {hd.tongTien.toLocaleString("vi-VN")} vnđ
                          </div>
                        </div>
                        <div className="it-2">
                          <div className="name">Ngày ở</div>
                          <div className="value">
                            {hd.ngayBatdau.split("-")[2]}/
                            {hd.ngayBatdau.split("-")[1]}
                            {" đến "}
                            {hd.ngayKetthuc.split("-")[2]}/
                            {hd.ngayKetthuc.split("-")[1]}
                          </div>
                        </div>
                        <div className="it-detais">
                          <div className="details-items">
                            <i className="fa-solid fa-calendar-days"></i>{" "}
                            {Math.floor(
                              (new Date(hd.ngayKetthuc.split("T")[0]) -
                                new Date(hd.ngayBatdau.split("T")[0])) /
                                (24 * 3600 * 1000)
                            )}{" "}
                            ngày
                          </div>
                          <div className="details-items">
                            <i className="fa-solid fa-bolt"></i>{" "}
                            {hd.Tieuthu.soDienKetthuc - hd.Tieuthu.soDienBatDau}{" "}
                            số
                          </div>
                          <div className="details-items">
                            <i className="fa-solid fa-droplet"></i>
                            {hd.Tieuthu.soNuocKetthuc -
                              hd.Tieuthu.soNuocBatDau}{" "}
                            khối
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <>
            <div className="h2">Tình trạng</div>
            <div className="thongtin">
              <table>
                <tbody>
                  <tr>
                    <td>Tình trạng</td>
                    <td>
                      {phong.Nguoitro.length > 0 ? "Đang sử dụng" : "Trống"}
                    </td>
                  </tr>
                  {phong.Nguoitro.length > 0 ? (
                    <>
                      <tr>
                        <td>Số người đang ở hiện tại</td>
                        <td>
                          {
                            phong.Nguoitro.filter(
                              (person) => person.isOnline === true
                            ).length
                          }{" "}
                          người
                        </td>
                      </tr>
                      <tr>
                        <td>Số ngày chưa xuất phiếu</td>
                        <td>
                          {Math.floor(
                            (new Date() - new Date(ngaybatdau)) /
                              (1000 * 3600 * 24)
                          )}{" "}
                          ngày
                        </td>
                      </tr>
                      <tr>
                        <td>Tiền cọc còn lại</td>
                        <td>{parseInt(tiencoc).toLocaleString("vi-VN")} đ</td>
                      </tr>
                      <tr>
                        <td>Dư nợ những tháng trước</td>
                        <td>{tienno.toLocaleString("vi-VN")} đ</td>
                      </tr>
                      <tr>
                        <td>Số công tơ điện tháng trước</td>
                        <td>{phong.sodien} số</td>
                      </tr>
                      <tr>
                        <td>Số công tơ nước tháng trước</td>
                        <td>{phong.sonuoc} khối</td>
                      </tr>
                      <tr>
                        <td>Tạm tính</td>
                        <td className="font-medium">
                          {(
                            Math.round(
                              (phong.giaPhong /
                                new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth() + 1,
                                  0
                                ).getDate()) *
                                Math.floor(
                                  (new Date() - new Date(phong?.Ngaybatdau)) /
                                    (1000 * 3600 * 24)
                                )
                            ) +
                            Math.round(
                              (tienrac /
                                new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth() + 1,
                                  0
                                ).getDate()) *
                                Math.floor(
                                  (new Date() - new Date(phong?.Ngaybatdau)) /
                                    (1000 * 3600 * 24)
                                )
                            )
                          ).toLocaleString("vi-VN")}
                          đ
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td>Số ngày trống</td>
                        <td>
                          {Math.floor(
                            (new Date() - new Date(phong?.created_at)) /
                              (1000 * 3600 * 24)
                          )}{" "}
                          ngày
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </>
          {phong.Nguoitro.length == 0 && (
            <>
              <div className="h2">Thống kê</div>
              <div className="thongtin">
                <table>
                  <tbody>
                    <tr>
                      <td>Ngày bắt đầu</td>
                      <td>
                        {phong.Ngaybatdau ?? phong?.created_at.split("T")[0]}
                      </td>
                    </tr>
                    <tr>
                      <td>Số người từng thuê</td>
                      <td>{phong.DaTro.length} người</td>
                    </tr>
                    <tr>
                      <td>Tổng điện tiêu thụ</td>
                      <td>0 số</td>
                    </tr>
                    <tr>
                      <td>Tổng lượng nước tiêu thụ</td>
                      <td>0 khối</td>
                    </tr>
                    <tr>
                      <td>Số phiếu đã xuất</td>
                      <td>0 phiếu</td>
                    </tr>
                    <tr>
                      <td>Tổng doanh thu</td>
                      <td>0 vnđ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="pt-3 tools-container flex">
          <button
            className="no-bg flex gap-2 items-center"
            onClick={handleBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          {isThanhtoan ? (
            <button className="wait flex gap-2 items-center">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i> Đang chờ
              thanh toán
            </button>
          ) : (
            <>
              {phong.Nguoitro.length > 0 && (
                <button
                  className="done flex gap-2 items-center"
                  onClick={handleThanhtoan}
                >
                  <i className="fa-solid fa-coins"></i> Thanh toán
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Details_phong;
