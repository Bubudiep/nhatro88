import React, { useState } from "react";

const UpdateNhatro = ({ selectedNhatro, onUpdateNhatro, onClose }) => {
  const [nhatroData, setNhatroData] = useState(selectedNhatro || {});

  // Hàm xử lý khi giá trị của trường thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNhatroData({
      ...nhatroData,
      [name]: value,
    });
  };

  // Hàm xử lý khi người dùng nhấn nút cập nhật
  const handleUpdate = () => {
    onUpdateNhatro(nhatroData);
    onClose(); // Đóng component sau khi cập nhật
  };

  return (
    <div className="capnhat-nhatro-container">
      <div className="capnhat-nhatro-header">
        <h2>Cập nhật nhà trọ</h2>
        <button onClick={onClose}>Đóng</button>
      </div>
      <div className="capnhat-nhatro-body">
        <div className="form-group">
          <label>Tên nhà trọ</label>
          <input
            type="text"
            name="tenTro"
            value={nhatroData.tenTro || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="diachi"
            value={nhatroData.diachi || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Giá phòng thấp nhất</label>
          <input
            type="number"
            name="giaphongThapnhat"
            value={nhatroData.giaphongThapnhat || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Giá phòng cao nhất</label>
          <input
            type="number"
            name="giaphongCaonhat"
            value={nhatroData.giaphongCaonhat || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Trạng thái</label>
          <select
            name="isActive"
            value={nhatroData.isActive || ""}
            onChange={handleInputChange}
          >
            <option value={true}>Hoạt động</option>
            <option value={false}>Tạm dừng</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tiện ích</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={nhatroData.wifi || false}
                onChange={(e) =>
                  setNhatroData({
                    ...nhatroData,
                    wifi: e.target.checked,
                  })
                }
              />
              Wifi
            </label>
            <label>
              <input
                type="checkbox"
                name="dieuhoa"
                checked={nhatroData.dieuhoa || false}
                onChange={(e) =>
                  setNhatroData({
                    ...nhatroData,
                    dieuhoa: e.target.checked,
                  })
                }
              />
              Điều hòa
            </label>
            <label>
              <input
                type="checkbox"
                name="nonglanh"
                checked={nhatroData.nonglanh || false}
                onChange={(e) =>
                  setNhatroData({
                    ...nhatroData,
                    nonglanh: e.target.checked,
                  })
                }
              />
              Nóng lạnh
            </label>
          </div>
        </div>
      </div>
      <div className="capnhat-nhatro-footer">
        <button onClick={handleUpdate}>Cập nhật</button>
      </div>
    </div>
  );
};

export default UpdateNhatro;
