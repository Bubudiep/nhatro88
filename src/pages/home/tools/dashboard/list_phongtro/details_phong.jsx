import React, { useEffect, useState } from "react";
import money from "../../../../../img/banknotes_12748234.png";

const Details_phong = ({
  phong,
  handleBack,
  handleThanhtoan,
  handleCapnhap,
}) => {
  const [isThanhtoan, setIsThanhtoan] = useState(false);
  const [tienrac, settienrac] = useState(0);
  const [ngaybatdau, setngaybatdau] = useState(0);
  const [tiencoc, settiencoc] = useState(0);
  useEffect(() => {
    console.log(phong);
    let dbatdau = null;
    let tongcoc = 0;
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
    setngaybatdau(dbatdau?.toISOString().split("T")[0]);
    settiencoc(tongcoc);
  }, []);
  return (
    <>
      <div className="title2">
        {phong.soPhong} ({phong.tenTang})
      </div>
      <div className="body-container">
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
          {isThanhtoan ? (
            <>
              <div className="chitiet-hoadon">
                <div className="h2">Chi tiết phiếu</div>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
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
                          <td>Đang ở hiện tại</td>
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
                          <td>Số ngày cho thuê</td>
                          <td>
                            {Math.floor(
                              (new Date() - new Date(ngaybatdau)) /
                                (1000 * 3600 * 24)
                            )}{" "}
                            ngày
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền cọc</td>
                          <td>
                            {parseInt(tiencoc).toLocaleString("vi-VN")} VNĐ
                          </td>
                        </tr>
                        <tr>
                          <td>Dư nợ tháng trước</td>
                          <td>0đ</td>
                        </tr>
                        <tr>
                          <td>Số công tơ điện tháng trước</td>
                          <td>{phong.sodien}</td>
                        </tr>
                        <tr>
                          <td>Số công tơ nước tháng trước</td>
                          <td>{phong.sonuoc}</td>
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
          )}
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
                      <td>Số hóa đơn đã xuất</td>
                      <td>0 hóa đơn</td>
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
              <button
                className="add flex gap-2 items-center"
                onClick={handleCapnhap}
              >
                <i className="fa-solid fa-pen-to-square"></i>Cập nhập
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Details_phong;
