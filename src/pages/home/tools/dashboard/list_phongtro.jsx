import React, { useState, useEffect } from "react";
import api from "../../../../components/api";
import Update_phong from "./list_phongtro/update_phong";
import Payment_phong from "./list_phongtro/payment_phong";
import Details_phong from "./list_phongtro/details_phong";
import ChitietHoadon from "./list_phongtro/chitietHoadon";
import Add_nguoi from "./list_phongtro/add_nguoi";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [Hoadon, setHoadon] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const [editNhatro, setEditNhatro] = useState(false);
  const [IsThanhtoan, setIsThanhtoan] = useState(false);
  const [IsCapnhap, setIsCapnhap] = useState(false);
  const [selectedNhatro, setSelectedNhatro] = useState(user.nhatro[0].id);
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
  const filterPhongtro2 = (nhatro) => {
    if (option == "off") {
      const tro = nhatro.reduce((acc, tro) => {
        if (tro.id == selectedNhatro) {
          acc.push(tro.Thongtin);
        }
        return acc;
      }, []);
      console.log(tro[0]);
      return tro[0];
    }
    return [];
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
          option == "off" ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
            >
              <Add_nguoi
                user={user}
                phong={editNhatro}
                handleBack={(e) => {
                  if (e) {
                    onUserUpdate(e);
                  }
                  setSlide2("slideOut2");
                  setTimeout(() => {
                    setSlideMain("slideIn2");
                    setEditNhatro(false);
                  }, 200);
                }}
              />
            </div>
          ) : IsCapnhap ? (
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
                handleBack={(e) => {
                  if (e.id) {
                    setEditNhatro(e);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setIsThanhtoan(false);
                  }, 200);
                }}
              />
            </div>
          ) : Hoadon ? (
            <div
              className={`slider overflow-hidden flex-1 message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <ChitietHoadon
                hoadon={Hoadon}
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                handleBack={(e) => {
                  if (e.id) {
                    setEditNhatro(e);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setHoadon(null);
                  }, 200);
                }}
                token={user?.app?.access_token}
              />
            </div>
          ) : (
            <div
              className={`slider overflow-hidden flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
            >
              <Details_phong
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
                handleBack2={handleBack2}
                handleBack={handleBack}
                handleThanhtoan={handleThanhtoan}
                handleCapnhap={handleCapnhap}
                handleHoadon={(e) => {
                  setSlide2("slideOut");
                  setTimeout(() => {
                    setSlideMain("slideIn");
                    setHoadon(e);
                  }, 200);
                }}
              />
            </div>
          )
        ) : (
          <div
            className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
          >
            {option == "off" ? (
              <>
                <div className="title2">
                  Danh sách phòng (
                  {user?.nhatro.length == 1 ? user?.nhatro[0].tenTro : ""})
                </div>
                <div className="flex justify-center text-[13px] mt-[-5px]">
                  - Chọn một phòng để thêm người vào ở -
                </div>
                <div className="body-container">
                  {user?.nhatro.length > 1 ? (
                    <div className="filter-container">
                      <select
                        value={selectedNhatro}
                        onChange={(e) => {
                          setSelectedNhatro(e.target.value);
                        }}
                      >
                        {user?.nhatro.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.tenTro}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="list_item_big">
                    {filterPhongtro2(user?.nhatro).map((item) => (
                      <div key={item.id} className="nhatro-item layout">
                        <div className="tang_name">{item.tenTang}</div>
                        <div className="list_phong">
                          {item.Chitiet.map((phong) => (
                            <div
                              key={phong.id}
                              className={`items ${
                                phong.Nguoitro.length > 0 ? "online" : "offline"
                              }`}
                              onClick={() => {
                                handleEditTro(phong);
                              }}
                            >
                              <div className="status">
                                {phong.Nguoitro.length == 0 ? (
                                  <i className="fa-solid fa-door-open"></i>
                                ) : (
                                  <i className="fa-solid fa-door-closed"></i>
                                )}
                              </div>
                              <div className="name">
                                {phong.soPhong
                                  .replaceAll("Phòng", "P")
                                  .replaceAll(" ", "") + " "}
                                <div className="sub">
                                  {phong.Nguoitro.length == 0 ? (
                                    "Trống"
                                  ) : phong.Nguoitro.length >= 2 ? (
                                    "Đầy"
                                  ) : (
                                    <>
                                      {phong.Nguoitro.length}{" "}
                                      <i className="fa-regular fa-user"></i>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
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
                          className={`details ${
                            item.isActive ? "active" : "stop"
                          }`}
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
                            <div
                              className={`items ${item.wifi ? "on" : "off"}`}
                            >
                              {item.wifi ? "Có" : "Không"} Wifi
                            </div>
                            <div
                              className={`items ${item.dieuhoa ? "on" : "off"}`}
                            >
                              {item.dieuhoa ? "Có" : "Không"} Điều hòa
                            </div>
                            <div
                              className={`items ${
                                item.nonglanh ? "on" : "off"
                              }`}
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPhongtro;
