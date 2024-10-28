import React, { useEffect, useState } from "react";
import api from "../../../../../components/api";

const Details_nguoi = ({ nguoitro, handleBack, token, onUserUpdate }) => {
  const [errorMes, seterrorMes] = useState(false);
  const [Isloading, setIsloading] = useState(false);
  const [nguoi, setnguoi] = useState(nguoitro);
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Đóng");
      handleBack();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      history.pushState(null, "", window.location.href);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const handleTamtru = () => {
    setIsloading(true);
    const update = api
      .post(
        `/tamtru/`,
        {
          phongtro: nguoi.id,
        },
        token
      )
      .then((response) => {
        onUserUpdate(response?.nhatro);
        setnguoi(response?.lichsu);
      })
      .catch((error) => {
        seterrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  return (
    <>
      <div className="title2">{nguoi?.ThongtinNguoiTro.hoTen}</div>
      <div className="body-container overflow-auto">
        <div className="chitiet-phongtro">
          <div className="doanhthu">
            <div className="details">
              <div
                className={`items ${
                  nguoi?.ThongtinNguoiTro.tamtru ? "on" : "off"
                }`}
              >
                {nguoi?.ThongtinNguoiTro.tamtru ? "Đã" : "Chưa"} đăng ký tạm trú
              </div>
            </div>
          </div>
          <div className="h3 pt-1 pb-1">Thông tin cá nhân</div>
          <div className="thongtin">
            <table>
              <tbody>
                <tr>
                  <td>Họ tên</td>
                  <td>{nguoi?.ThongtinNguoiTro?.hoTen}</td>
                </tr>
                <tr>
                  <td>Điện thoại</td>
                  <td>{nguoi?.ThongtinNguoiTro?.sdt}</td>
                </tr>
                <tr>
                  <td>CCCD</td>
                  <td>{nguoi?.ThongtinNguoiTro?.cccd}</td>
                </tr>
                <tr>
                  <td>Ngày sinh</td>
                  <td>{nguoi?.ThongtinNguoiTro?.ngaysinh.split("T")[0]}</td>
                </tr>
                <tr>
                  <td>Quê quán</td>
                  <td>{nguoi?.ThongtinNguoiTro?.quequan}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h3 pt-1 pb-1">Thông tin lưu trú</div>
          <div className="thongtin">
            <table>
              <tbody>
                <tr>
                  <td>Phòng</td>
                  <td>
                    {nguoi.SoPhong} - {nguoitro.SoTang}
                  </td>
                </tr>
                <tr>
                  <td>Ngày vào</td>
                  <td>{nguoi.ngayBatdauO}</td>
                </tr>
                <tr>
                  <td>Số tiền cọc</td>
                  <td>{nguoi.tiencoc.toLocaleString("vi-VN")} đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {errorMes && <div className="error-message">{errorMes}</div>}
        <div className="pt-3 tools-container flex">
          <button
            className="no-bg flex gap-2 items-center"
            onClick={handleBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          {!nguoi?.ThongtinNguoiTro.tamtru ? (
            <button
              className="add flex gap-2 items-center"
              onClick={handleTamtru}
            >
              {Isloading ? (
                <div className="loading-spinner" />
              ) : (
                <i className="fa-solid fa-paper-plane"></i>
              )}
              Xác nhận tạm trú
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Details_nguoi;
