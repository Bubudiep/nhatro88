import React, { useEffect, useState } from "react";
import api from "../../../../../components/api";

const Payment_phong = ({ phong, onUserUpdate, token, handleBack }) => {
  const [Isloading, setIsloading] = useState(false);
  const [ngaybatdau, setngaybatdau] = useState(0);
  const [sodien, setsodien] = useState(phong?.sodien ?? 0);
  const [sonuoc, setsonuoc] = useState(phong?.sonuoc ?? 0);
  const [tiendien, settiendien] = useState(phong?.tiendien ?? 0);
  const [tiennuoc, settiennuoc] = useState(phong?.tiennuoc ?? 0);
  const [tienrac, settienrac] = useState(phong?.tienrac ?? 0);
  const [tienkhac, settienkhac] = useState(phong?.tienkhac ?? 0);
  const [ghichukhac, setghichukhac] = useState();
  const [errorMes, setErrorMes] = useState("");
  const [songay, setsongay] = useState(0);
  useEffect(() => {
    let dbatdau = null;
    phong.Nguoitro.forEach((nguoi) => {
      if (dbatdau) {
        if (new Date(nguoi.ngayBatdauO) < new Date(dbatdau)) {
          dbatdau = new Date(nguoi.ngayBatdauO);
        }
      } else {
        dbatdau = new Date(nguoi.ngayBatdauO);
      }
    });
    phong.hoadon.forEach((hoadon) => {
      if (dbatdau) {
        if (new Date(hoadon.ngayKetthuc) > new Date(dbatdau)) {
          const ngayKetthuc = new Date(hoadon.ngayKetthuc);
          ngayKetthuc.setDate(ngayKetthuc.getDate() + 1);
          dbatdau = ngayKetthuc;
        }
      } else {
        const ngayKetthuc = new Date(hoadon.ngayKetthuc);
        ngayKetthuc.setDate(ngayKetthuc.getDate() + 1);
        dbatdau = ngayKetthuc;
      }
    });
    setngaybatdau(dbatdau.toISOString().split("T")[0]);
    setsongay(Math.floor((new Date() - dbatdau) / (24 * 3600000)) + 1);
  }, []);
  const handleXuathoadon = () => {
    setIsloading(true);
    const update = api
      .post(
        `/t-thanhtoan/`,
        {
          phong: phong.id,
          soTienPhong:
            songay *
            (phong.giaPhong /
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getDate()),
          soDien: sodien,
          soNuoc: sonuoc,
          soTienDien: tiendien * (sodien - phong.sodien),
          soTienNuoc: tiennuoc * (sonuoc - phong.sonuoc),
          soTienWifi: 0,
          soTienRac:
            (songay * tienrac) /
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ).getDate(),
          soTienKhac: tienkhac,
          tongTien:
            tienkhac +
            tiennuoc * (sonuoc - phong.sonuoc) +
            tiendien * (sodien - phong.sodien) +
            songay *
              (phong.giaPhong /
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).getDate()) +
            (songay * tienrac) /
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getDate(),
          ngayBatdau: ngaybatdau,
          ngayKetthuc: new Date().toISOString().split("T")[0],
        },
        token
      )
      .then((response) => {
        onUserUpdate(response);
        response.forEach((tro) => {
          tro.Thongtin.forEach((tang) => {
            tang.Chitiet.forEach((nphong) => {
              nphong.id == phong.id && handleBack(nphong);
            });
          });
        });
      })
      .catch((error) => {
        setErrorMes("Lỗi khi cập nhật, vui lòng thử lại sau!");
        console.error("Lỗi khi cập nhật:", error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Đóng");
      handleBack();
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
        {phong.soPhong} ({phong.tenTang}) - thanh toán
      </div>
      <div className="body-container">
        {ngaybatdau > new Date() ? (
          <>
            <div className="chitiet-phongtro">
              <div className="h2">Tiêu thụ</div>
              <table>
                <tbody>
                  <tr>
                    <td>Điện (số cũ {phong.sodien})</td>
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
                    <td>Nước (số cũ {phong.sonuoc})</td>
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
                    ngaybatdau.toString().substring(5, 10).split("-")[0]}{" "}
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
                        {parseInt(
                          (
                            songay *
                            (phong.giaPhong /
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth() + 1,
                                0
                              ).getDate())
                          ).toFixed(0)
                        ).toLocaleString("vi-VN")}{" "}
                        vnđ
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền điện</td>
                      <td>{sodien - phong.sodien} số</td>
                      <td>
                        {(tiendien * (sodien - phong.sodien)).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        vnđ
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền nước</td>
                      <td>{sonuoc - phong.sonuoc} khối</td>
                      <td>
                        {(tiennuoc * (sonuoc - phong.sonuoc)).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        vnđ
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền rác</td>
                      <td>{songay} ngày</td>
                      <td>
                        {parseInt(
                          (
                            (songay * tienrac) /
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth() + 1,
                              0
                            ).getDate()
                          ).toFixed(0)
                        ).toLocaleString("vi-VN")}{" "}
                        vnđ
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền khác</td>
                      <td></td>
                      <td>{tienkhac.toLocaleString("vi-VN")} vnđ</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="font-medium text-base pt-1 pb-1">
                          Tổng
                        </div>
                      </td>
                      <td className="font-medium text-base text-[#dd7d00]">
                        {parseInt(
                          (
                            tienkhac +
                            tiennuoc * (sonuoc - phong.sonuoc) +
                            tiendien * (sodien - phong.sodien) +
                            songay *
                              (phong.giaPhong /
                                new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth() + 1,
                                  0
                                ).getDate()) +
                            (songay * tienrac) /
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth() + 1,
                                0
                              ).getDate()
                          ).toFixed(0)
                        ).toLocaleString("vi-VN")}{" "}
                        vnđ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="null">
              <div className="icon"></div>
              <div className="value">Chưa ở đủ số ngày để mà tạo phiếu</div>
            </div>
          </>
        )}
        {errorMes && <div className="error-message">{errorMes}</div>}
        <div className="pt-3 tools-container flex">
          <button
            className="no-bg flex gap-2 items-center"
            onClick={handleBack}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
          {ngaybatdau > new Date() ? (
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
          ) : (
            ``
          )}
        </div>
      </div>
    </>
  );
};

export default Payment_phong;
