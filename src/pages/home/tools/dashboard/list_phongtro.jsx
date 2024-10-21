import React, { useState, useEffect } from "react";
import api from "../../../../components/api";
import Update_phong from "./list_phongtro/update_phong";
import Payment_phong from "./list_phongtro/payment_phong";
import Details_phong from "./list_phongtro/details_phong";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const [editNhatro, setEditNhatro] = useState(false);
  const [IsThanhtoan, setIsThanhtoan] = useState(false);
  const [IsCapnhap, setIsCapnhap] = useState(false);
  const [selectedNhatro, setSelectedNhatro] = useState("all");
  const [selectedTang, setSelectedTang] = useState("");
  const [formUpdates, setformupdates] = useState({
    phong: null,
    giaphong: 0,
    sodien: 0,
    sonuoc: 0,
    dieuhoa: false,
    nonglanh: false,
    wifi: false,
  });
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
  const handleBack2 = () => {
    setSlideMain("slideOut2");
    setTimeout(() => {
      setSlide2("slideIn2");
      setIsThanhtoan(false);
    }, 200);
  };
  const handleThanhtoan = () => {
    setSlide2("slideOut");
    setTimeout(() => {
      setSlideMain("slideIn");
      setIsThanhtoan(true);
    }, 200);
  };
  const handleTaophieu = () => {
    console.log(editNhatro.id);
  };
  const handleCapnhap = () => {
    setformupdates((prevState) => ({
      ...prevState,
      phong: editNhatro.id,
      giaphong: editNhatro.giaPhong,
      sodien: editNhatro.sodien,
      sonuoc: editNhatro.sonuoc,
      dieuhoa: editNhatro.dieuhoa,
      nonglanh: editNhatro.nonglanh,
      wifi: editNhatro.wifi,
    }));
    setSlide2("slideOut");
    setTimeout(() => {
      setSlideMain("slideIn");
      setIsCapnhap(true);
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
          IsCapnhap ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <Update_phong
                phong={editNhatro}
                token={user?.app?.access_token}
                handleUpdatesuccess={(e) => {
                  if (e && e?.tro && e?.phong) {
                    onUserUpdate(e.tro);
                    setEditNhatro(e.phong);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setIsCapnhap(false);
                  }, 200);
                }}
              />
            </div>
          ) : IsThanhtoan ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <Payment_phong
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
                handleBack2={handleBack2}
                handleTaophieu={handleTaophieu}
              />
            </div>
          ) : (
            <div
              className={`slider flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
            >
              <Details_phong
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
                handleBack2={handleBack2}
                handleBack={handleBack}
                handleThanhtoan={handleThanhtoan}
                handleCapnhap={handleCapnhap}
              />
            </div>
          )
        ) : (
          <div
            className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
          >
            <div className="title2">
              {option == "off"
                ? "Danh sách phòng trống"
                : "Danh sách phòng trọ"}
            </div>
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
                            <div className="value">
                              {item.Nguoitro.length} người
                            </div>
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
