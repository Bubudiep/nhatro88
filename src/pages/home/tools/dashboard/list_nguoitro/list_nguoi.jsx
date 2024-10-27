import React, { useState } from "react";

const List_nguoi = ({ handleNguoitro, user, handleClose }) => {
  const [selectedNhatro, setSelectedNhatro] = useState("all");
  const [selectedTang, setSelectedTang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  window.addEventListener("popstate", (event) => {
    console.log("Đóng");
    handleClose();
  });
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
  const getTangOptions = () => {
    if (selectedNhatro === "all") return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };
  return (
    <>
      <div className="title2">Danh sách người đang ở trọ</div>
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
              <div
                key={item.id}
                className="nhatro-item"
                onClick={() => handleNguoitro(item)}
              >
                <div className={`details ${item.isOnline ? "active" : "stop"}`}>
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
                    <div className="value">
                      {Math.floor(
                        (new Date() - new Date(item.ngayBatdauO)) /
                          (24 * 3600 * 1000)
                      ) + 1}{" "}
                      ngày
                    </div>
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
                    <div className={`items  ${item.tiencoc ? "on" : "off"}`}>
                      Đã cọc {item.tiencoc.toLocaleString("vi-VN")}đ
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
    </>
  );
};

export default List_nguoi;
