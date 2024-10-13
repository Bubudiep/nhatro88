import React, { useState, useEffect } from "react";
import ThemPhongtro from "./them_phongtro"; // Import component ThemPhongtro
import ThemTangtro from "./them_tangtro";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [user2, setUser2] = useState(user);
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

  const handleAddPhongtro = () => {
    setIsTransitioning(true); // Bắt đầu hiệu ứng chuyển tiếp
    setTimeout(() => {
      setIsAdding("Tro"); // Chuyển sang chế độ thêm phòng sau hiệu ứng
      setIsTransitioning(false);
    }, 300); // Thời gian delay phù hợp với hiệu ứng
  };
  const handleThemtang = () => {
    setIsTransitioning(true); // Bắt đầu hiệu ứng chuyển tiếp
    setTimeout(() => {
      setIsAdding("Tang"); // Chuyển sang chế độ thêm phòng sau hiệu ứng
      setIsTransitioning(false);
    }, 300); // Thời gian delay phù hợp với hiệu ứng
  };

  const handleGoBack = () => {
    setIsTransitioning(true); // Bắt đầu hiệu ứng quay lại
    setTimeout(() => {
      setIsAdding(false); // Quay lại danh sách phòng sau hiệu ứng
      setIsTransitioning(false);
    }, 300);
  };

  const handleUpdateUser = (newUserData) => {
    if (onUserUpdate) {
      onUserUpdate(newUserData);
    }
  };

  const filterPhongtro = (nhatro) => {
    if (selectedNhatro === "all") {
      return nhatro.reduce((acc, tro) => {
        tro.Thongtin.forEach((tang) => {
          acc.push(...tang.Chitiet);
        });
        return acc;
      }, []);
    }

    return nhatro.reduce((acc, tro) => {
      if (tro.id == selectedNhatro) {
        tro.Thongtin.forEach((tang) => {
          if (!selectedTang || tang.id == selectedTang) {
            acc.push(...tang.Chitiet);
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
        setUser2((old) => ({
          ...old,
          nhatro: response.results,
        }));
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
        {isAdding == "Tro" ? (
          <div
            className={`transition-container ${
              isTransitioning ? "fade-out" : "fade-in"
            }`}
          >
            <ThemPhongtro
              user={user}
              onClose={handleGoBack}
              themPhongtro={handleThemtang}
            />{" "}
          </div>
        ) : isAdding == "Tang" ? (
          <div
            className={`transition-container ${
              isTransitioning ? "fade-out" : "fade-in"
            }`}
          >
            <ThemTangtro
              user={user}
              onClose={handleGoBack}
              updateNhatro={updateNhatro}
            />
          </div>
        ) : (
          <div
            className={`transition-container ${
              isTransitioning ? "fade-out" : "fade-in"
            }`}
          >
            <div className="title">Danh sách phòng trọ</div>

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
                  {user?.nhatro.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tenTro}
                    </option>
                  ))}
                </select>
                {/* Select để chọn tầng, chỉ hiển thị khi đã chọn 1 nhà trọ */}
                {selectedNhatro !== "all" && (
                  <select
                    value={selectedTang}
                    onChange={(e) => setSelectedTang(e.target.value)}
                  >
                    <option value="">Tất cả tầng</option>
                    {getTangOptions().map((tang, index) => (
                      <option key={index} value={tang.id}>
                        {tang.tenTang}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="list_item_big">
                {filterPhongtro(user?.nhatro).map((item) => (
                  <div key={item.id} className="nhatro-item">
                    <div className="logo">0 VNĐ</div>
                    <div
                      className={`details ${item.isActive ? "active" : "stop"}`}
                    >
                      <div className="i-info">
                        <div className="name i-title">{item.soPhong}</div>
                        <div className="value">
                          {item.isActive ? (
                            <div className="status active">Hoạt động</div>
                          ) : (
                            <div className="status stop">Tạm dừng</div>
                          )}
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name">Đang dùng</div>
                        <div className="value">???</div>
                      </div>
                      <div className="i-info">
                        <div className="name">Ngày bắt đầu</div>
                        <div className="value">
                          <div className="bold">00/00/00</div>
                        </div>
                      </div>
                    </div>
                    <div className="view">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add">
                <div className="add-box" onClick={handleAddPhongtro}>
                  <div className="icon">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="text">Thêm phòng</div>
                </div>
                <div className="add-box" onClick={handleThemtang}>
                  <div className="icon">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="text">Thêm tầng</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPhongtro;
