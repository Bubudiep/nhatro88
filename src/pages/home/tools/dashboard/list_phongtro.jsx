import React, { useState, useEffect } from "react";
import api from "../../../../components/api";
import money from "../../../../img/banknotes_12748234.png";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const [editNhatro, setEditNhatro] = useState(false);
  const [IsThanhtoan, setIsThanhtoan] = useState(false);
  const [PendingThanhtoan, setPendingThanhtoan] = useState(false);
  const [IsCapnhap, setIsCapnhap] = useState(false);
  const [Isloading, setIsloading] = useState(false);
  const [selectedNhatro, setSelectedNhatro] = useState("all");
  const [selectedTang, setSelectedTang] = useState("");
  const [tiendien, settiendien] = useState(0);
  const [tiennuoc, settiennuoc] = useState(0);
  const [sodien, setsodien] = useState(1);
  const [sonuoc, setsonuoc] = useState(1);
  const [tienrac, settienrac] = useState(0);
  const [songay, setsongay] = useState(0);
  const [ngaybatdau, setngaybatdau] = useState(0);
  const [tiencoc, settiencoc] = useState(0);
  const [tienkhac, settienkhac] = useState(0);
  const [ghichukhac, setghichukhac] = useState();
  const [errorMes, setErrorMes] = useState("");
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
    const dango = phong.Nguoitro.filter((person) => person.isOnline === true);
    setPendingThanhtoan(false);
    user.nhatro.forEach((tro) => {
      tro.Thongtin.forEach((tang) => {
        tang.Chitiet.forEach((phong2) => {
          if (phong2.id == phong.id) {
            phong2.hoadon.forEach((hd) => {
              if (hd.isPaid == false) {
                setPendingThanhtoan(hd);
                console.log(hd);
              }
            });
            settiendien(tro.tiendien);
            settiennuoc(tro.tiennuoc);
            settienrac(tro.tienrac);
          }
        });
      });
    });
    const ngayBatdau =
      dango.length > 0
        ? dango.reduce((min, item) => {
            return new Date(item.ngayBatdauO) < new Date(min)
              ? item.ngayBatdauO
              : min;
          }, dango[0].ngayBatdauO)
        : 0;
    const tongTienCoc = dango.reduce((sum, item) => sum + item.tiencoc, 0);
    console.log(phong);
    setngaybatdau(ngayBatdau);
    settiencoc(tongTienCoc);

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
    console.log(editNhatro);
    setSlide2("slideOut");
    setTimeout(() => {
      setsongay(
        Math.floor((new Date() - new Date(ngaybatdau)) / (1000 * 3600 * 24))
      );
      setsodien(editNhatro.sodien + 1);
      setsonuoc(editNhatro.sonuoc + 1);
      setSlideMain("slideIn");
      setIsThanhtoan(true);
    }, 200);
  };
  const handleXuathoadon = () => {
    console.log(editNhatro);
    setIsloading(true);
    const update = api
      .post(
        `/t-thanhtoan/`,
        {
          phong: editNhatro.id,
          soTienPhong: Math.round(
            songay *
              (editNhatro.giaPhong /
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).getDate())
          ),
          soDien: sodien,
          soNuoc: sonuoc,
          soTienDien: tiendien * (sodien - editNhatro.sodien),
          soTienNuoc: tiennuoc * (sonuoc - editNhatro.sonuoc),
          soTienWifi: 0,
          soTienRac:
            songay *
            Math.round(
              tienrac /
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).getDate()
            ),
          soTienKhac: tienkhac,
          tongTien:
            parseInt(tienkhac) +
            tiennuoc * (sonuoc - editNhatro.sonuoc) +
            tiendien * (sodien - editNhatro.sodien) +
            Math.round(
              songay *
                (editNhatro.giaPhong /
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                  ).getDate())
            ) +
            songay *
              Math.round(
                tienrac /
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                  ).getDate()
              ),
          ngayBatdau: ngaybatdau,
          ngayKetthuc: new Date().toISOString().split("T")[0],
        },
        user?.app?.access_token
      )
      .then((response) => {
        onUserUpdate(response);
        console.log(response);
        response.forEach((tro) => {
          tro.Thongtin.forEach((tang) => {
            tang.Chitiet.forEach((phong2) => {
              if (phong2.id == editNhatro.id) {
                phong2.hoadon.forEach((hd) => {
                  if (hd.isPaid == false) {
                    setPendingThanhtoan(hd);
                  }
                });
                setEditNhatro(phong2);
                setsodien(phong2.sodien);
                setsonuoc(phong2.sonuoc);
                settiendien(tro.tiendien);
                settiennuoc(tro.tiennuoc);
                settienrac(tro.tienrac);
              }
            });
          });
        });
        setSlideMain("slideOut2");
        setTimeout(() => {
          setSlide2("slideIn2");
          setIsThanhtoan(false);
        }, 200);
      })
      .catch((error) => {
        setErrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  const handleLuulai = () => {
    setIsloading(true);
    const update = api
      .post(`/u-phong/`, formUpdates, user?.app?.access_token)
      .then((response) => {
        console.log(response);
        setEditNhatro(response.phong);
        setformupdates((prevState) => ({
          ...prevState,
          phong: editNhatro.id,
          giaphong: response.phong.giaPhong,
          sodien: response.phong.sodien,
          sonuoc: response.phong.sonuoc,
          dieuhoa: response.phong.dieuhoa,
          nonglanh: response.phong.nonglanh,
          wifi: response.phong.wifi,
        }));
        setErrorMes("");
        onUserUpdate(response.tro);
        setSlideMain("slideOut2");
        setTimeout(() => {
          setSlide2("slideIn2");
          setIsCapnhap(false);
        }, 200);
      })
      .catch((error) => {
        setErrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
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
              <div className="title2">
                {editNhatro.soPhong} ({editNhatro.tenTang}) - cập nhập
              </div>
              <div className="body-container">
                <div className="chitiet-phongtro">
                  <div className="thongtin-edit">
                    <table>
                      <tbody>
                        <tr>
                          <td>Giá phòng</td>
                          <td>
                            <input
                              type="number"
                              value={formUpdates.giaphong}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  giaphong: e.target.value,
                                }));
                              }}
                              placeholder="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Số công tơ điện</td>
                          <td>
                            <input
                              type="number"
                              value={formUpdates.sodien}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  sodien: e.target.value,
                                }));
                              }}
                              placeholder="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Số công tơ nước</td>
                          <td>
                            <input
                              type="number"
                              value={formUpdates.sonuoc}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  sonuoc: e.target.value,
                                }));
                              }}
                              placeholder="0"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Điều hòa</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={formUpdates.dieuhoa}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  dieuhoa: e.target.checked,
                                }));
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Nóng lạnh</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={formUpdates.nonglanh}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  nonglanh: e.target.checked,
                                }));
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Wifi</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={formUpdates.wifi}
                              onChange={(e) => {
                                setformupdates((prevState) => ({
                                  ...prevState,
                                  wifi: e.target.checked,
                                }));
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {errorMes && <div className="error-message">{errorMes}</div>}
                <div className="pt-3 tools-container flex">
                  <button
                    className="add flex-1 h-[50px] flex items-center"
                    onClick={handleLuulai}
                  >
                    {Isloading ? (
                      <div className="loading-spinner" />
                    ) : (
                      <i className="fa-solid fa-arrow-left"></i>
                    )}
                    Lưu và quay lại
                  </button>
                </div>
              </div>
            </div>
          ) : IsThanhtoan ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <div className="title2">
                {editNhatro.soPhong} ({editNhatro.tenTang}) - thanh toán
              </div>
              <div className="body-container">
                <div className="chitiet-phongtro">
                  <div className="h2">Tiêu thụ</div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Số điện hiện tại</td>
                        <td>
                          <input
                            type="number"
                            value={sodien}
                            onChange={(e) => {
                              setsodien(e.target.value);
                            }}
                            placeholder="0"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Số nước hiện tại</td>
                        <td>
                          <input
                            type="number"
                            value={sonuoc}
                            onChange={(e) => {
                              setsonuoc(e.target.value);
                            }}
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="h2 flex">
                    Chi tiết sử dụng
                    <div className="ml-auto">
                      {ngaybatdau.toString().substring(5, 10).split("-")[1] +
                        "/" +
                        ngaybatdau
                          .toString()
                          .substring(5, 10)
                          .split("-")[0]}{" "}
                      đến{" "}
                      {new Date()
                        .toISOString()
                        .split("T")[0]
                        .substring(5, 10)
                        .split("-")[1] +
                        "/" +
                        new Date()
                          .toISOString()
                          .split("T")[0]
                          .substring(5, 10)
                          .split("-")[0]}
                    </div>
                  </div>
                  <div className="thongtin">
                    <table>
                      <thead>
                        <tr>
                          <th>Hạng mục</th>
                          <th>Chi tiết</th>
                          <th>Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tiền phòng</td>
                          <td>{songay} ngày</td>
                          <td>
                            {Math.round(
                              songay *
                                (editNhatro.giaPhong /
                                  new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 1,
                                    0
                                  ).getDate())
                            ).toLocaleString("vi-VN")}{" "}
                            vnđ
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền điện</td>
                          <td>{sodien - editNhatro.sodien} số</td>
                          <td>
                            {(
                              tiendien *
                              (sodien - editNhatro.sodien)
                            ).toLocaleString("vi-VN")}{" "}
                            vnđ
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền nước</td>
                          <td>{sonuoc - editNhatro.sonuoc} khối</td>
                          <td>
                            {(
                              tiennuoc *
                              (sonuoc - editNhatro.sonuoc)
                            ).toLocaleString("vi-VN")}{" "}
                            vnđ
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền rác</td>
                          <td>{songay} ngày</td>
                          <td>
                            {(
                              songay *
                              Math.round(
                                tienrac /
                                  new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 1,
                                    0
                                  ).getDate()
                              )
                            ).toLocaleString("vi-VN")}{" "}
                            vnđ
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền khác</td>
                          <td>
                            <textarea
                              type="text"
                              value={ghichukhac}
                              onChange={(e) => {
                                setghichukhac(e.target.value);
                              }}
                              placeholder="ghi chú"
                            />
                          </td>
                          <td>
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={tienkhac}
                                onChange={(e) => {
                                  settienkhac(e.target.value);
                                }}
                                className="small"
                                placeholder="0"
                              />
                              <div className="unit mr-2">vnđ</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <div className="font-medium text-base pt-1 pb-1">
                              Tổng
                            </div>
                          </td>
                          <td className="font-medium text-base text-[#dd7d00]">
                            {(
                              parseInt(tienkhac) +
                              tiennuoc * (sonuoc - editNhatro.sonuoc) +
                              tiendien * (sodien - editNhatro.sodien) +
                              Math.round(
                                songay *
                                  (editNhatro.giaPhong /
                                    new Date(
                                      new Date().getFullYear(),
                                      new Date().getMonth() + 1,
                                      0
                                    ).getDate())
                              ) +
                              songay *
                                Math.round(
                                  tienrac /
                                    new Date(
                                      new Date().getFullYear(),
                                      new Date().getMonth() + 1,
                                      0
                                    ).getDate()
                                )
                            ).toLocaleString("vi-VN")}{" "}
                            vnđ
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {errorMes && <div className="error-message">{errorMes}</div>}
                <div className="pt-3 tools-container flex">
                  <button
                    className="no-bg flex gap-2 items-center"
                    onClick={handleBack2}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Quay lại
                  </button>
                  <button
                    className="add flex gap-2 items-center"
                    onClick={handleXuathoadon}
                  >
                    {Isloading ? (
                      <div className="loading-spinner" />
                    ) : (
                      <i className="fa-solid fa-paper-plane"></i>
                    )}
                    Tạo phiếu
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`slider flex-1 message-box fade-in-5 p-[20px] gap-2 flex flex-col ${slide2}`}
            >
              <div className="title2">
                {editNhatro.soPhong} ({editNhatro.tenTang})
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
                    <div
                      className={`items ${editNhatro.dieuhoa ? "on" : "off"}`}
                    >
                      {editNhatro.dieuhoa ? "Có" : "Không"} Điều hòa
                    </div>
                    <div
                      className={`items ${editNhatro.nonglanh ? "on" : "off"}`}
                    >
                      {editNhatro.nonglanh ? "Có" : "Không"} Nóng lạnh
                    </div>
                  </div>
                </div>
                {PendingThanhtoan ? (
                  <>
                    <div className="chitiet-hoadon">
                      <div className="h2">Chi tiết phiếu</div>
                      <table>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
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
                                <td>
                                  {
                                    editNhatro.Nguoitro.filter(
                                      (person) => person.isOnline === true
                                    ).length
                                  }{" "}
                                  người
                                </td>
                              </tr>
                              <tr>
                                <td>Số ngày cho thuê</td>
                                <td>
                                  {Math.floor(
                                    (new Date() - new Date(ngaybatdau)) /
                                      (1000 * 3600 * 24)
                                  )}{" "}
                                  ngày
                                </td>
                              </tr>
                              <tr>
                                <td>Tiền cọc</td>
                                <td>
                                  {parseInt(tiencoc).toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </td>
                              </tr>
                              <tr>
                                <td>Dư nợ tháng trước</td>
                                <td>0đ</td>
                              </tr>
                              <tr>
                                <td>Số công tơ điện tháng trước</td>
                                <td>{editNhatro.sodien}</td>
                              </tr>
                              <tr>
                                <td>Số công tơ nước tháng trước</td>
                                <td>{editNhatro.sonuoc}</td>
                              </tr>
                              <tr>
                                <td>Tạm tính</td>
                                <td className="font-medium">
                                  {(
                                    Math.round(
                                      (editNhatro.giaPhong /
                                        new Date(
                                          new Date().getFullYear(),
                                          new Date().getMonth() + 1,
                                          0
                                        ).getDate()) *
                                        Math.floor(
                                          (new Date() -
                                            new Date(editNhatro?.Ngaybatdau)) /
                                            (1000 * 3600 * 24)
                                        )
                                    ) +
                                    Math.round(
                                      (tienrac /
                                        new Date(
                                          new Date().getFullYear(),
                                          new Date().getMonth() + 1,
                                          0
                                        ).getDate()) *
                                        Math.floor(
                                          (new Date() -
                                            new Date(editNhatro?.Ngaybatdau)) /
                                            (1000 * 3600 * 24)
                                        )
                                    )
                                  ).toLocaleString("vi-VN")}
                                  đ
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr>
                                <td>Số ngày trống</td>
                                <td>
                                  {Math.floor(
                                    (new Date() -
                                      new Date(editNhatro?.created_at)) /
                                      (1000 * 3600 * 24)
                                  )}{" "}
                                  ngày
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              {editNhatro.Nguoitro.length == 0 && (
                <>
                  <div className="h2">Thống kê</div>
                  <div className="thongtin">
                    <table>
                      <tbody>
                        <tr>
                          <td>Ngày bắt đầu</td>
                          <td>
                            {editNhatro.Ngaybatdau ??
                              editNhatro?.created_at.split("T")[0]}
                          </td>
                        </tr>
                        <tr>
                          <td>Số người từng thuê</td>
                          <td>{editNhatro.DaTro.length} người</td>
                        </tr>
                        <tr>
                          <td>Tổng điện tiêu thụ</td>
                          <td>0 số</td>
                        </tr>
                        <tr>
                          <td>Tổng lượng nước tiêu thụ</td>
                          <td>0 khối</td>
                        </tr>
                        <tr>
                          <td>Số hóa đơn đã xuất</td>
                          <td>0 hóa đơn</td>
                        </tr>
                        <tr>
                          <td>Tổng doanh thu</td>
                          <td>0 vnđ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <div className="pt-3 tools-container flex">
                <button
                  className="no-bg flex gap-2 items-center"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  Quay lại
                </button>
                {PendingThanhtoan ? (
                  <button className="wait flex gap-2 items-center">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i> Đang
                    chờ thanh toán
                  </button>
                ) : (
                  <>
                    {editNhatro.Nguoitro.length > 0 && (
                      <button
                        className="done flex gap-2 items-center"
                        onClick={handleThanhtoan}
                      >
                        <i className="fa-solid fa-coins"></i> Thanh toán
                      </button>
                    )}
                    <button
                      className="add flex gap-2 items-center"
                      onClick={handleCapnhap}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>Cập nhập
                    </button>
                  </>
                )}
              </div>
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
