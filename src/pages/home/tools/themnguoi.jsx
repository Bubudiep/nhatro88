import React, { useRef, useState, useEffect } from "react";
import api from "zmp-sdk";
import localApi from "../../../components/api";

const ThemNguoiComponent = ({ user, onClose, onUserUpdate }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [selectedNhatro, setSelectedNhatro] = useState(user?.nhatro[0]?.id);
  const [selectedTang, setSelectedTang] = useState("");
  const [selectedPhong, setSelectedPhong] = useState(""); // Thêm trạng thái cho phòng
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [formData, setFormData] = useState({
    fromQR: false,
    tro: selectedNhatro,
    tang: selectedTang,
    phong: selectedPhong,
    hoTen: "",
    sdt: "",
    gioitinh: "",
    cccd: "",
    ngaySinh: "",
    quequan: "",
    tienCoc: 1000000,
    ngayBatDau: new Date().toISOString().split("T")[0],
  });
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
                const cccd_data = content.split("|");
                if (cccd_data.length >= 6) {
                  setFormData((prevData) => ({
                    ...prevData,
                    fromQR: true,
                    hoTen: cccd_data[2],
                    cccd: cccd_data[0],
                    ngaySinh: cccd_data[3],
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Kiểm tra dữ liệu vừa nhập
    console.log("Dữ liệu người vừa nhập:", formData);
    if (
      !formData.hoTen ||
      !formData.cccd ||
      !formData.ngaySinh ||
      !formData.tang ||
      !formData.phong ||
      !formData.tro
    ) {
      setErrorMessage("Chưa nhập đầy đủ thông tin");
      return false;
    }
    const create_nguoi = await localApi
      .post("/them-nguoi/", formData, user?.app?.access_token)
      .then((response) => {
        console.log(response);
        onUserUpdate(response);
        setIsAdded(true);
      })
      .catch((error) => {
        setErrorMessage(
          error?.response?.data?.Error ?? "Lỗi khi thêm người vào nhà trọ!"
        );
        console.error("Lỗi khi lấy thông tin nhà trọ:", error);
      });
    // Sau khi thu thập thông tin, bạn có thể gửi formData lên API
  };

  // Lấy danh sách tầng dựa vào nhà trọ đã chọn
  const getTangOptions = () => {
    if (!selectedNhatro) return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };

  // Lấy danh sách phòng dựa vào tầng đã chọn
  const getPhongOptions = () => {
    if (!selectedTang) return [];
    const tangSelected = getTangOptions().find(
      (tang) => tang.id === parseInt(selectedTang)
    );
    return tangSelected ? tangSelected.Chitiet : [];
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="slider fade-in-5">
          <div className="title">Thêm người vào ở</div>
          <div className="body-container">
            <div className="flex gap-1 no-width">
              <select
                value={selectedNhatro}
                onChange={(e) => {
                  setSelectedNhatro(e.target.value);
                  setSelectedTang(""); // Reset tầng khi chọn nhà trọ khác
                  setSelectedPhong(""); // Reset phòng khi chọn nhà trọ khác
                  setFormData((prevData) => ({
                    ...prevData,
                    tro: e.target.value, // Cập nhật giá trị tro trong formData
                  }));
                }}
              >
                {user?.nhatro.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.tenTro}
                  </option>
                ))}
              </select>
              {getTangOptions().length > 0 && (
                <select
                  value={selectedTang}
                  name="tang"
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedTang(e.target.value);
                    setSelectedPhong(""); // Reset phòng khi chọn tầng khác
                    setFormData((prevData) => ({
                      ...prevData,
                      tang: e.target.value, // Cập nhật giá trị tro trong formData
                    }));
                  }}
                  disabled={!selectedNhatro} // Không cho chọn tầng nếu chưa chọn nhà trọ
                >
                  <option>Chọn tầng</option>
                  {getTangOptions().map((tang, index) => (
                    <option key={index} value={tang.id}>
                      {tang.tenTang}
                    </option>
                  ))}
                </select>
              )}
              {getPhongOptions().length > 0 && (
                <select
                  name="phong"
                  value={selectedPhong}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedPhong(e.target.value);
                  }}
                  disabled={!selectedTang} // Không cho chọn phòng nếu chưa chọn tầng
                >
                  <option value={""}>Chọn phòng</option>
                  {getPhongOptions().map((phong, index) => (
                    <option key={index} value={phong.id}>
                      {phong.soPhong}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {isAdded ? (
              <>
                <div className="success-message flex-1 items-center justify-center text-[#999] text-lg">
                  <div className="logo">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="text">Thêm thành công!</div>
                </div>
                <div className="start-btn">
                  <button
                    className="back"
                    onClick={() => {
                      setIsAdded(false);
                    }}
                  >
                    Quay lại
                  </button>
                  {/* <button>Xem danh sách người ở trọ</button> */}
                </div>
              </>
            ) : selectedPhong ? (
              <>
                <div className="h3">
                  <div className="actions">
                    <button className="scan" onClick={handleScanQR}>
                      <i className="fa-solid fa-qrcode"></i>Quét mã căn cước
                      công dân
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
                        <input
                          type="text"
                          name="gioitinh"
                          value={formData.gioitinh}
                          onChange={handleChange}
                          placeholder="Nam/Nữ..."
                        />
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
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                <div className="start-btn">
                  <button
                    disabled={selectedPhong ? false : true}
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <div className="flex gap-5 justify-center items-center">
                        <div className="loading-spinner-in"></div>Loading...
                      </div>
                    ) : (
                      "Thêm vào trọ"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-[#999] text-lg">
                Chọn một phòng trọ để thêm người mới vào
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemNguoiComponent;
