import React, { useState } from "react";
import api from "../../../../components/api";

const ThemTangtro = ({ user, onClose, updateNhatro }) => {
  const [selectedNhatro, setSelectedNhatro] = useState(user?.nhatro[0]?.id);
  const [tenPhong, setTenPhong] = useState("Tầng 1");
  const [soPhong, setSoPhong] = useState(10);
  const [autoPhong, setAutoPhong] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thêm thành công
  const [loading, setLoading] = useState(false); // Trạng thái chờ khi gọi API
  const [errorMessage, setErrorMessage] = useState(""); // Trạng thái lỗi

  // Lấy danh sách tầng dựa vào nhà trọ đã chọn
  const getTangOptions = () => {
    if (!selectedNhatro) return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };

  // Hàm xử lý khi thêm phòng trọ
  const handleAddPhongtro = async () => {
    const newTangtro = {
      soTang: tenPhong,
      taoPhong: autoPhong,
      soPhong: soPhong,
      nhaTro: selectedNhatro,
    };
    if (user?.app?.access_token) {
      setLoading(true); // Bắt đầu trạng thái chờ
      setErrorMessage(""); // Xóa thông báo lỗi trước đó
      try {
        const createTangtro = await api.post(
          "/themtangtro/",
          newTangtro,
          user.app.access_token
        );
        updateNhatro(true);
      } catch (e) {
        console.error(e);
        setErrorMessage(
          e?.response?.data?.Error ??
            "Có lỗi xảy ra khi thêm tầng. Vui lòng thử lại."
        );
      } finally {
        setLoading(false); // Kết thúc trạng thái chờ
      }
    }
  };

  return (
    <>
      <div className="title">
        <div className="left">Thêm tầng</div>
      </div>
      <div className="body-container">
        {isSuccess ? (
          <div className="success-message">
            <div className="logo">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="message">Thêm thành công!</div>
            <div className="start-btn">
              <button className="add" onClick={() => setIsSuccess(false)}>
                Thêm tầng mới
              </button>
              <button className="back" onClick={onClose}>
                <i className="fa-solid fa-arrow-left"></i> Quay lại
              </button>
            </div>
          </div>
        ) : (
          <>
            <table>
              <tbody>
                <tr>
                  <td>Nhà trọ</td>
                  <td>
                    <select
                      value={selectedNhatro}
                      onChange={(e) => {
                        setSelectedNhatro(e.target.value);
                        setSelectedTang("");
                      }}
                    >
                      {user?.nhatro.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tenTro}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Tên tầng</td>
                  <td>
                    <input
                      type="text"
                      placeholder="tầng số 1..."
                      value={tenPhong}
                      onChange={(e) => setTenPhong(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Số phòng</td>
                  <td>
                    <div className="flex items-center justify-end">
                      <input
                        type="number"
                        placeholder="10"
                        value={soPhong}
                        onChange={(e) => setSoPhong(e.target.value)}
                      />
                      <div className="unit">Phòng</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="flex items-center gap-3 pt-3 text-[#999]">
                      <input
                        type="checkbox"
                        checked={autoPhong}
                        onChange={(e) => setAutoPhong(!autoPhong)}
                      />{" "}
                      Tự động tạo danh sách phòng bằng số phòng
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Hiển thị trạng thái loading hoặc lỗi */}
            {loading ? (
              <div className="loading-message">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              errorMessage && (
                <div className="error-message">
                  <span>{errorMessage}</span>
                </div>
              )
            )}
            <div className="start-btn">
              <button
                className="add"
                onClick={handleAddPhongtro}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Thêm tầng trọ"}
              </button>
              <button className="back" onClick={onClose}>
                <i className="fa-solid fa-arrow-left"></i> Quay lại
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ThemTangtro;
