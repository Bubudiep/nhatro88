import React from "react";

const Chitiet_phong = ({ phong, handleBack }) => {
  const handleSave = () => {
    console.log(phong);
  };
  return (
    <>
      <div className="title2">
        {phong.soPhong} - {phong.tenTang}
      </div>
      <div className="body-container">
        <div className="form-update flex-1">
          <div className="h3">
            <div className="name">Danh sách đang ở</div>
          </div>
          <div className="list-group">
            {phong.Nguoitro.length > 0 ? (
              <>
                {phong.Nguoitro.map((nguoitro) => (
                  <div key={nguoitro.id} className="items">
                    <div className="user-info">
                      <div className="it-1">
                        <div className="name">
                          {nguoitro.ThongtinNguoiTro.hoTen}
                        </div>
                        <div className="value">
                          <div className="icon">
                            <i className="fa-solid fa-square-phone-flip"></i>
                          </div>
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Liên hệ</div>
                        <div className="value">
                          {nguoitro.ThongtinNguoiTro.sdt}
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Tiền cọc</div>
                        <div className="value">
                          {nguoitro.tiencoc.toLocaleString("vi-VN")} vnđ
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Ngày vào</div>
                        <div className="value">{nguoitro.ngayBatdauO}</div>
                      </div>
                    </div>
                    <div className="tools">
                      <div
                        className={`status ${nguoitro.ThongtinNguoiTro.tamtru}`}
                      >
                        <div className="logo">
                          {nguoitro.ThongtinNguoiTro.tamtru ? (
                            <i className="fa-solid fa-check" />
                          ) : (
                            <i class="fa-solid fa-x"></i>
                          )}
                        </div>
                        <div className="text">
                          {nguoitro.ThongtinNguoiTro.tamtru
                            ? "Đã tạm trú"
                            : "Chưa tạm trú"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="null">
                <div className="logo">
                  <i className="fa-solid fa-people-pulling"></i>
                </div>
                <div className="message">Danh sách trống</div>
              </div>
            )}
          </div>
          <div className="mt-auto">
            <div className="add back" onClick={handleBack}>
              <div className="add-box">
                <div className="icon">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="text">Quay lại</div>
              </div>
            </div>
            <div className="add" onClick={handleSave}>
              <div className="add-box">
                <div className="icon">
                  <i className="fa-solid fa-cloud-arrow-down"></i>
                </div>
                <div className="text">Lưu cài đặt</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chitiet_phong;
