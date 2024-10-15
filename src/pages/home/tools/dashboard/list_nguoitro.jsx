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
        <div
          className={`transition-container ${
            isTransitioning ? "fade-out" : "fade-in"
          }`}
        >
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
              {/* Select để chọn tầng, chỉ hiển thị khi đã chọn 1 nhà trọ */}
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
              {filterNguoitro(user?.nhatro).map((item) => (
                <div key={item.id} className="nhatro-item">
                  <div
                    className={`details ${item.isOnline ? "active" : "stop"}`}
                  >
                    <div className="i-info">
                      <div className="name i-title">
                        {item?.ThongtinNguoiTro?.hoTen}
                        <div className="tang">
                          {item.SoPhong} - {item.SoTang}
                        </div>
                      </div>
                      <div className="value giaphong">400,000 VNĐ</div>
                    </div>
                    <div className="i-info">
                      <div className="name">Đã đăng ký tạm trú</div>
                      <div className="value"></div>
                    </div>
                    <div className="i-info">
                      <div className="name">Số ngày đã ở</div>
                      <div className="value">3 ngày</div>
                    </div>
                    <div className="i-info">
                      <div className="name">Tiền cọc lần đầu</div>
                      <div className="value">500,000 vnđ</div>
                    </div>
                    <div className="i-info">
                      <div className="name">Thanh toán lần cuối</div>
                      <div className="value">{item?.ngayBatdauO}</div>
                    </div>
                  </div>
                  <div className="view">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNguoitro;
