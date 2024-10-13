import React, { useRef, useState, useEffect } from "react";
import api from "zmp-sdk";
import localApi from "../../../components/api";

const ThemNguoiComponent = ({ onClose }) => {
  console.log(localApi);
  const [isClosing, setIsClosing] = useState(false);
  const [today, setToday] = useState("");
  const [formData, setFormData] = useState({
    tang: "",
    phong: "",
    hoTen: "",
    cccd: "",
    ngaySinh: "",
    tienCoc: 1000000,
    ngayBatDau: "",
  });

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
    setToday(formattedDate);
    setFormData((prevData) => ({
      ...prevData,
      ngayBatDau: formattedDate,
    }));
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };

  const handleScanQR = () => {
    api.requestCameraPermission({
      success: ({ userAllow, message }) => {
        if (userAllow) {
          api.scanQRCode({
            success: (data) => {
              const { content } = data;
              if (content) {
                console.log(content);
              }
            },
          });
        }
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Kiểm tra dữ liệu vừa nhập
    console.log("Dữ liệu người vừa nhập:", formData);
    // Sau khi thu thập thông tin, bạn có thể gửi formData lên API
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="title">Thêm người vào ở</div>
        <div className="body-container">
          <div className="h3">
            <div className="actions">
              <button className="scan" onClick={handleScanQR}>
                <i className="fa-solid fa-qrcode"></i>Quét mã căn cước công dân
              </button>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Tầng</td>
                <td>
                  <select
                    name="tang"
                    value={formData.tang}
                    onChange={handleChange}
                  >
                    <option value="">Chọn tầng</option>
                    <option value="1">Tầng 1</option>
                    <option value="2">Tầng 2</option>
                    {/* Thêm các tầng khác */}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Phòng</td>
                <td>
                  <select
                    name="phong"
                    value={formData.phong}
                    onChange={handleChange}
                  >
                    <option value="">Chọn phòng</option>
                    <option value="101">Phòng 101</option>
                    <option value="102">Phòng 102</option>
                    {/* Thêm các phòng khác */}
                  </select>
                </td>
              </tr>
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
                <td>CCCD</td>
                <td>
                  <input
                    type="text"
                    name="cccd"
                    value={formData.cccd}
                    onChange={handleChange}
                    placeholder="Số căn cước..."
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
          <div className="start-btn">
            <button onClick={handleSubmit}>Thêm vào trọ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemNguoiComponent;
