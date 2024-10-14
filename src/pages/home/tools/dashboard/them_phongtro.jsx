import React, { useState } from "react";

const ThemPhongtro = ({ user, onClose, themPhongtro }) => {
  const [selectedNhatro, setSelectedNhatro] = useState(user.nhatro[0].id);
  const [selectedTang, setSelectedTang] = useState("");
  const [tenPhong, setTenPhong] = useState("");
  const [giaPhong, setGiaPhong] = useState("");
  const [trangThai, setTrangThai] = useState("Hoạt động");
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thêm thành công

  // Lấy danh sách tầng dựa vào nhà trọ đã chọn
  const getTangOptions = () => {
    if (!selectedNhatro) return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };

  // Hàm xử lý khi thêm phòng trọ
  const handleAddPhongtro = () => {
    const newPhongtro = {
      tenPhong,
      giaPhong,
      trangThai,
      nhatroId: selectedNhatro,
      tangId: selectedTang,
    };
    console.log("Phòng trọ mới:", newPhongtro);
    // Giả sử thành công sau khi thêm phòng trọ
    setIsSuccess(true);
  };

  return (
    <>
      <div className="title">
        <div className="left">Thêm phòng trọ</div>
      </div>
      <div className="body-container">
        {isSuccess ? (
          // Hiển thị khi thêm thành công
          <div className="success-message">
            <div className="logo">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="message">Thêm phòng trọ thành công!</div>
            <div className="start-btn">
              <button className="add" onClick={() => setIsSuccess(false)}>
                Thêm phòng mới
              </button>
            </div>
          </div>
        ) : (
          // Form thêm phòng trọ khi chưa thêm
          <table>
            <tbody>
              <tr>
                <td>Nhà trọ</td>
                <td>
                  <select
                    value={selectedNhatro}
                    onChange={(e) => {
                      setSelectedNhatro(e.target.value);
                      setSelectedTang(""); // Reset tầng khi chọn nhà trọ khác
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
                <td>Tầng trọ</td>
                <td>
                  {getTangOptions().length > 0 ? (
                    <select
                      value={selectedTang}
                      onChange={(e) => setSelectedTang(e.target.value)}
                      disabled={!selectedNhatro} // Không cho chọn tầng nếu chưa chọn nhà trọ
                    >
                      {getTangOptions().map((tang, index) => (
                        <option key={index} value={tang.id}>
                          {tang.tenTang}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <button className="add" onClick={themPhongtro}>
                      Thêm tầng
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>Tên phòng</td>
                <td>
                  <input
                    type="text"
                    placeholder="phòng số 1..."
                    value={tenPhong}
                    onChange={(e) => setTenPhong(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Giá phòng</td>
                <td>
                  <div className="flex items-center justify-end">
                    <input
                      type="text"
                      placeholder="1000000..."
                      value={giaPhong}
                      onChange={(e) => setGiaPhong(e.target.value)}
                    />
                    <div className="unit">VNĐ</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Trạng thái</td>
                <td>
                  <select
                    value={trangThai}
                    onChange={(e) => setTrangThai(e.target.value)}
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {!isSuccess && (
          <div className="start-btn">
            <button className="add" onClick={handleAddPhongtro}>
              Thêm phòng trọ
            </button>
            <button className="back" onClick={onClose}>
              <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ThemPhongtro;
