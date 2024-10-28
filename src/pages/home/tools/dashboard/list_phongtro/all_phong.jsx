import React, { useEffect, useState } from "react";

const All_phong = ({ user, handleEditTro, handleClose }) => {
  const [selectedNhatro, setSelectedNhatro] = useState(user.nhatro[0].id);
  const [selectedTang, setSelectedTang] = useState("");
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
  const getTangOptions = () => {
    if (selectedNhatro === "all") return [];
    const nhatroSelected = user.nhatro.find(
      (item) => item.id === parseInt(selectedNhatro)
    );
    return nhatroSelected ? nhatroSelected.Thongtin : [];
  };
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Đóng");
      handleClose();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      history.pushState(null, "", window.location.href);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <>
      <div className="title2">Danh sách phòng</div>
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
            <div
              key={item.id}
              className={`nhatro-item ${
                item.Nguoitro.length > 0 ? "money" : "no-human"
              }`}
            >
              <div
                className={`details ${item.isActive ? "active" : "stop"}`}
                onClick={() => {
                  handleEditTro(item);
                }}
              >
                <div className="i-info">
                  <div className="name i-title">
                    {item.soPhong}
                    <div className="tang">{item.tenTang}</div>
                  </div>
                  <div className="value giaphong">
                    {item.giaPhong.toLocaleString("vi-VN")} VNĐ
                  </div>
                </div>
                {item.Nguoitro.length === 0 ? (
                  <div className="i-null">
                    <div className="logo">
                      <i className="fa-solid fa-door-closed"></i>
                    </div>
                    <div className="message">Chưa có ai ở!</div>
                  </div>
                ) : (
                  <>
                    <div className="i-info">
                      <div className="name">Đang ở</div>
                      <div className="value">{item.Nguoitro.length} người</div>
                    </div>
                    <div className="i-info">
                      <div className="name">Ngày bắt đầu</div>
                      <div className="value">
                        {item.Ngaybatdau ?? item.created_at}
                      </div>
                    </div>
                  </>
                )}
                <div className="i-details mt-1">
                  <div className={`items ${item.wifi ? "on" : "off"}`}>
                    {item.wifi ? "Có" : "Không"} Wifi
                  </div>
                  <div className={`items ${item.dieuhoa ? "on" : "off"}`}>
                    {item.dieuhoa ? "Có" : "Không"} Điều hòa
                  </div>
                  <div className={`items ${item.nonglanh ? "on" : "off"}`}>
                    {item.nonglanh ? "Có" : "Không"} Nóng lạnh
                  </div>
                </div>
              </div>
              <div className="view">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default All_phong;
