import React, { useState, useEffect } from "react";
import api from "../../../../components/api";
import money from "../../../../img/banknotes_12748234.png";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const [editNhatro, setEditNhatro] = useState(false); // Trạng thái cho việc thêm phòng trọ
  const [selectedNhatro, setSelectedNhatro] = useState("all");
  const [selectedTang, setSelectedTang] = useState("");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  const filterPhongtro = (nhatro) => {
    if (option == "off") {
      if (selectedNhatro === "all") {
        return nhatro.reduce((acc, tro) => {
          tro.Thongtin.forEach((tang) => {
            acc.push(
              ...tang.Chitiet.filter((chitiet) => chitiet.Nguoitro.length == 0)
            );
          });
          return acc;
        }, []);
      }

      return nhatro.reduce((acc, tro) => {
        if (tro.id == selectedNhatro) {
          tro.Thongtin.forEach((tang) => {
            if (!selectedTang || tang.id == selectedTang) {
              acc.push(
                ...tang.Chitiet.filter(
                  (chitiet) => chitiet.Nguoitro.length == 0
                )
              );
            }
          });
        }
        return acc;
      }, []);
    }
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
  const handleEditTro = (phong) => {
    console.log(phong);
    setSlideMain("slideOut");
    setTimeout(() => {
      setSlide2("slideIn");
      setEditNhatro(phong);
    }, 200);
  };

  const handleBack = () => {
    setSlide2("slideOut2");
    setTimeout(() => {
      setSlideMain("slideIn2");
      setEditNhatro(false);
    }, 200);
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
        {editNhatro ? (
          <div
            className={`slider flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
          >
            <div className="title2">
              {editNhatro.tenTang} - {editNhatro.soPhong}
            </div>
            <div className="chitiet-phongtro">
              <div className="doanhthu">
                <div className="logo">
                  <img src={money} />
                </div>
                <div className="value">
                  {editNhatro.giaPhong.toLocaleString("vi-VN")} VNĐ
                </div>
                <div className="details">
                  <div className={`items ${editNhatro.wifi ? "on" : "off"}`}>
                    {editNhatro.wifi ? "Có" : "Không"} Wifi
                  </div>
                  <div className={`items ${editNhatro.dieuhoa ? "on" : "off"}`}>
                    {editNhatro.dieuhoa ? "Có" : "Không"} Điều hòa
                  </div>
                  <div
                    className={`items ${editNhatro.nonglanh ? "on" : "off"}`}
                  >
                    {editNhatro.nonglanh ? "Có" : "Không"} Nóng lạnh
                  </div>
                </div>
              </div>
              <div className="h2">Tình trạng</div>
              <div className="thongtin">
                <table>
                  <tbody>
                    <tr>
                      <td>Tình trạng</td>
                      <td>
                        {editNhatro.Nguoitro.length > 0
                          ? "Đang sử dụng"
                          : "Trống"}
                      </td>
                    </tr>
                    {editNhatro.Nguoitro.length > 0 ? (
                      <>
                        <tr>
                          <td>Đang ở hiện tại</td>
                          <td>{editNhatro.Nguoitro.length} người</td>
                        </tr>
                        <tr>
                          <td>Số ngày cho thuê</td>
                          <td>{editNhatro.giaPhong}</td>
                        </tr>
                        <tr>
                          <td>Dự kiến doanh thu</td>
                          <td>{editNhatro.giaPhong}</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>Số ngày trống</td>
                          <td>0 ngày</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="h2">Thống kê</div>
              <div className="thongtin">
                <table>
                  <tbody>
                    <tr>
                      <td>Ngày bắt đầu</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Tỉ lệ lấp đầy</td>
                      <td>0% (0/0)</td>
                    </tr>
                    <tr>
                      <td>Số người từng thuê</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Số hóa đơn đã xuất</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Tổng doanh thu</td>
                      <td>{editNhatro.giaPhong}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tools-container flex">
              <button className="no-bg" onClick={handleBack}>
                Quay lại
              </button>
              <button className="add">Cập nhập thông tin</button>
            </div>
          </div>
        ) : (
          <div
            className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
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
                          {item.giaPhong} VNĐ
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
                            <div className="value">
                              {item.Nguoitro.length} người
                            </div>
                          </div>
                          <div className="i-info">
                            <div className="name">Ngày bắt đầu</div>
                            <div className="value">{item.Ngaybatdau}</div>
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
                        <div
                          className={`items ${item.nonglanh ? "on" : "off"}`}
                        >
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPhongtro;
