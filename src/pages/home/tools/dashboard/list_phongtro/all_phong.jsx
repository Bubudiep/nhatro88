import React, { useEffect, useState } from "react";

const All_phong = ({ user, handleEditTro, handleClose }) => {
  const [selectedNhatro, setSelectedNhatro] = useState(user.nhatro[0].id);
  const [selectedTang, setSelectedTang] = useState("");
  const filterPhongtro = (nhatro) => {
    const tro = nhatro.reduce((acc, tro) => {
      if (tro.id == selectedNhatro) {
        acc.push(tro.Thongtin);
      }
      return acc;
    }, []);
    return tro[0];
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
      <div className="title2">
        Danh sách phòng (
        {user?.nhatro.length == 1 ? user?.nhatro[0].tenTro : ""})
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
          {filterPhongtro(user?.nhatro).map((item) => (
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
                      <div
                        className={`${
                          phong.hoadon.filter((phong) => {
                            return !phong.isPaid;
                          }).length == 0
                            ? "noo"
                            : "down"
                        }`}
                      >
                        {phong.hoadon.length == 0 ? (
                          <>
                            <i className="fa-regular fa-user"></i>
                          </>
                        ) : phong.hoadon
                            .reduce((tong, hoadon) => {
                              const tongChiTiet = hoadon.Chitiet.reduce(
                                (tongChiTiet, chiTiet) => {
                                  return tongChiTiet + chiTiet.so_tien;
                                },
                                0
                              );
                              return tong + (hoadon.tongTien - tongChiTiet);
                            }, 0)
                            .toFixed(0) == 0 ? (
                          <i className="fa-regular fa-face-laugh-wink"></i>
                        ) : parseInt(
                            phong.hoadon
                              .reduce((tong, hoadon) => {
                                const tongChiTiet = hoadon.Chitiet.reduce(
                                  (tongChiTiet, chiTiet) => {
                                    return tongChiTiet + chiTiet.so_tien;
                                  },
                                  0
                                );
                                return tong + (hoadon.tongTien - tongChiTiet);
                              }, 0)
                              .toFixed(0)
                          ) > 0 ? (
                          parseInt(
                            phong.hoadon
                              .reduce((tong, hoadon) => {
                                const tongChiTiet = hoadon.Chitiet.reduce(
                                  (tongChiTiet, chiTiet) => {
                                    return tongChiTiet + chiTiet.so_tien;
                                  },
                                  0
                                );
                                return tong + (hoadon.tongTien - tongChiTiet);
                              }, 0)
                              .toFixed(0)
                          ).toLocaleString("vi-VN") + "đ"
                        ) : (
                          <i className="fa-regular fa-face-meh-blank"></i>
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
  );
};

export default All_phong;
