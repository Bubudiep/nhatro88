import React, { useState, useEffect } from "react";
import api from "../../../../components/api";

const ListNguoitro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // Trạng thái cho việc thêm phòng trọ
  const [selectedNhatro, setSelectedNhatro] = useState("all");
  const [selectedTang, setSelectedTang] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false); // Trạng thái hiệu ứng

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  const filterNguoitro = (nhatro) => {
    if (selectedNhatro === "all") {
      const allnguoitro = nhatro.reduce((acc, tro) => {
        tro.Thongtin.forEach((tang) => {
          tang.Chitiet.forEach((phong) => {
            acc.push(...phong.Nguoitro);
          });
        });
        return acc;
      }, []);
      console.log(allnguoitro);
      return allnguoitro;
    }

    return nhatro.reduce((acc, tro) => {
      if (tro.id == selectedNhatro) {
        tro.Thongtin.forEach((tang) => {
          if (!selectedTang || tang.id == selectedTang) {
            tang.Chitiet.forEach((phong) => {
              acc.push(...phong.Nguoitro);
            });
          }
        });
      }
      return acc;
    }, []);
  };
  const updateNhatro = async () => {
    api
      .get("/my_nhatro/", user.app.access_token)
      .then((response) => {
        onUserUpdate(response.results);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin nhà trọ:", error);
      });
  };
  const getTangOptions = () => {
    if (selectedNhatro === "all") return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className={`slider fade-in-5`}>
          <div className="title">Danh sách người đang ở trọ</div>
          <div className="body-container">
            <div className="filter-container">
              <select
                value={selectedNhatro}
                onChange={(e) => {
                  setSelectedNhatro(e.target.value);
                  setSelectedTang("");
                }}
              >
                <option value="all">Tất cả nhà trọ</option>
                {user?.nhatro.map((item) => {
                  // Tính tổng số người trọ trong nhà trọ này
                  const totalNguoitro = item.Thongtin.reduce((acc, tang) => {
                    tang.Chitiet.forEach((phong) => {
                      acc += phong.Nguoitro.length; // Cộng số người trọ trong từng phòng
                    });
                    return acc;
                  }, 0);

                  return (
                    <option key={item.id} value={item.id}>
                      {item.tenTro} ({totalNguoitro} người)
                    </option>
                  );
                })}
              </select>
              {selectedNhatro !== "all" && (
                <select
                  value={selectedTang}
                  onChange={(e) => setSelectedTang(e.target.value)}
                >
                  <option value="">Tất cả tầng</option>
                  {getTangOptions().map((tang, index) => {
                    // Tính tổng số người trọ trong tầng này
                    const totalNguoitro = tang.Chitiet.reduce((acc, phong) => {
                      acc += phong.Nguoitro.length; // Cộng số người trọ trong từng phòng
                      return acc;
                    }, 0);

                    return (
                      <option key={index} value={tang.id}>
                        {tang.tenTang} ({totalNguoitro} người)
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <div className="list_item_big">
              {filterNguoitro(user?.nhatro).length > 0 ? (
                filterNguoitro(user?.nhatro).map((item) => (
                  <div key={item.id} className="nhatro-item">
                    <div
                      className={`details ${item.isOnline ? "active" : "stop"}`}
                    >
                      <div className="i-info">
                        <div className="name i-title">
                          {item?.ThongtinNguoiTro?.hoTen}
                        </div>
                        <div className="value giaphong">400,000 VNĐ</div>
                      </div>
                      <div className="i-info">
                        <div className="name font-medium text-[14px]">
                          <i className="fa-solid fa-house-user"></i>
                          {item.SoPhong} - {item.SoTang}
                        </div>
                        <div className="value">3 ngày</div>
                      </div>
                      <div className="i-info">
                        <div className="name font-medium text-[14px]">
                          <i className="fa-solid fa-mobile-screen"></i>
                          Liên hệ
                        </div>
                        <div className="flex gap-2 items-center value font-medium text-[14px] text-[#8f9fb4]">
                          {item.ThongtinNguoiTro.sdt}
                        </div>
                      </div>
                      <div className="i-details mt-1">
                        <div
                          className={`items  ${
                            item.ThongtinNguoiTro.tamtru ? "on" : "off"
                          }`}
                        >
                          {item.ThongtinNguoiTro.tamtru
                            ? "Đã tạm trú"
                            : "Chưa đăng ký tạm trú"}
                        </div>
                        <div className="items">
                          Đã cọc{" "}
                          {item.ThongtinNguoiTro.tiencoc.toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </div>
                      </div>
                    </div>
                    <div className="view">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-1 pt-10 items-center justify-center text-[#999] text-lg">
                  Nhà trọ của bạn đang không có ai ở!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNguoitro;
