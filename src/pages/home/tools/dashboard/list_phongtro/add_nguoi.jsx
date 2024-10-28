import React, { useEffect, useState } from "react";
import api from "zmp-sdk";
import localApi from "../../../../../components/api";

const Add_nguoi = ({ user, phong, handleBack }) => {
  console.log(phong);
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
  const [Isloading, setIsloading] = useState(false);
  const [errorMes, seterrorMes] = useState(false);
  const [formData, setFormData] = useState({
    fromQR: false,
    tang: phong.tang,
    phong: phong.id,
    hoTen: "",
    sdt: "",
    gioitinh: "Nam",
    cccd: "",
    ngaySinh: "",
    quequan: "",
    tienCoc: 1000000,
    ngayBatDau: new Date().toISOString().split("T")[0],
  });
  const handleVaotro = () => {
    console.log("Dữ liệu người vừa nhập:", formData);
    if (
      !formData.hoTen ||
      !formData.cccd ||
      !formData.ngaySinh ||
      !formData.tang ||
      !formData.phong
    ) {
      seterrorMes("Chưa nhập đầy đủ thông tin");
      return false;
    }
    const create_nguoi = localApi
      .post("/them-nguoi/", formData, user?.app?.access_token)
      .then((response) => {
        handleBack(response);
      })
      .catch((error) => {
        seterrorMes(
          error?.response?.data?.Error ?? "Lỗi khi thêm người vào nhà trọ!"
        );
        console.error("Lỗi khi lấy thông tin nhà trọ:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleScanQR = () => {
    api.requestCameraPermission({
      success: ({ userAllow, message }) => {
        if (userAllow) {
          api.scanQRCode({
            success: (data) => {
              const { content } = data;
              if (content) {
                const cccd_data = content.split("|");
                if (cccd_data.length >= 6) {
                  const ns = cccd_data[3];
                  setFormData((prevData) => ({
                    ...prevData,
                    fromQR: true,
                    hoTen: cccd_data[2],
                    cccd: cccd_data[0],
                    ngaySinh: `${ns.slice(4, 8)}-${ns.slice(2, 4)}-${ns.slice(
                      0,
                      2
                    )}`,
                    gioitinh: cccd_data[4],
                    quequan: cccd_data[5],
                  }));
                  console.log(content);
                }
              }
            },
          });
        }
      },
    });
  };
  return (
    <>
      <div className="title2">
        Thêm người vào {phong.soPhong} ({phong.tenTang})
      </div>
      <div className="body-container overflow-auto">
        <div className="chitiet-phongtro">
          <div className="h3 pt-1 pb-1">Thông tin cá nhân</div>

          <>
            <div className="h3">
              <div className="actions">
                <button className="scan" onClick={handleScanQR}>
                  <div className="icon">
                    <i className="fa-solid fa-qrcode"></i>
                  </div>
                  Quét mã căn cước công dân
                </button>
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Họ tên</td>
                  <td>
                    <input
                      type="text"
                      name="hoTen"
                      value={formData.hoTen}
                      onChange={handleChange}
                      placeholder="Họ và tên..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giới tính</td>
                  <td>
                    <select
                      name="gioitinh"
                      value={formData.gioitinh}
                      onChange={handleChange}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Điện thoại</td>
                  <td>
                    <input
                      type="number"
                      name="sdt"
                      value={formData.sdt}
                      onChange={handleChange}
                      placeholder="Số điện thoại..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>CCCD</td>
                  <td>
                    <input
                      type="number"
                      name="cccd"
                      value={formData.cccd}
                      onChange={handleChange}
                      placeholder="Số căn cước..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>Quê quán</td>
                  <td>
                    <input
                      type="text"
                      name="quequan"
                      value={formData.quequan}
                      onChange={handleChange}
                      placeholder="Quê quán..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>Ngày sinh</td>
                  <td>
                    <input
                      type="date"
                      name="ngaySinh"
                      value={formData.ngaySinh}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Tiền cọc trước</td>
                  <td>
                    <div className="flex relative justify-end items-center">
                      <input
                        type="number"
                        name="tienCoc"
                        value={formData.tienCoc}
                        onChange={handleChange}
                      />
                      <div className="unit">VNĐ</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Ngày bắt đầu vào ở</td>
                  <td>
                    <input
                      type="date"
                      name="ngayBatDau"
                      value={formData.ngayBatDau}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        </div>
        {errorMes && <div className="error-message">{errorMes}</div>}
        <div className="pt-3 tools-container flex">
          <button
            className="no-bg flex gap-2 items-center"
            onClick={() => handleBack(null)}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          <button
            className="add flex gap-2 items-center"
            onClick={handleVaotro}
          >
            {Isloading ? (
              <div className="loading-spinner" />
            ) : (
              <i className="fa-solid fa-circle-plus"></i>
            )}
            Thêm vào trọ
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_nguoi;
