import React, { useEffect, useState } from "react";
import api from "../../../../../components/api";

const Edit_nhatro = ({ nhatro, handleBack, onUserUpdate, token }) => {
  const [isLoading, setIsloading] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [ngaychot, setngaychot] = useState(nhatro.ngay_thu_tien ?? 15);
  const [tienPhong, setTienPhong] = useState(
    nhatro.tienphong.toLocaleString("vi-VN").replace(/\./g, ",") ?? 0
  );
  const [tienrac, settienrac] = useState(
    nhatro.tienrac.toLocaleString("vi-VN").replace(/\./g, ",") ?? 0
  );
  const [tiennuoc, settiennuoc] = useState(
    nhatro.tiennuoc.toLocaleString("vi-VN").replace(/\./g, ",") ?? 0
  );
  const [tiendien, settiendien] = useState(
    nhatro.tiendien.toLocaleString("vi-VN").replace(/\./g, ",") ?? 0
  );
  const [tienkhac, settienkhac] = useState(
    nhatro.tienkhac.toLocaleString("vi-VN").replace(/\./g, ",") ?? 0
  );
  const [chungchu, setChungchu] = useState(
    nhatro.chungchu.toLocaleString("vi-VN").replace(/\./g, ",") ? "Có" : "Không"
  );
  const [dieuhoa, setDieuhoa] = useState(
    nhatro?.dieuhoa.toLocaleString("vi-VN").replace(/\./g, ",") ? "Có" : "Không"
  );
  const [nonglanh, setNonglanh] = useState(
    nhatro?.nonglanh.toLocaleString("vi-VN").replace(/\./g, ",")
      ? "Có"
      : "Không"
  );
  const [wifi, setWifi] = useState(nhatro?.wifi ? "Có" : "Không");
  console.log(nhatro);
  const handleSave = () => {
    if (!nhatro) {
      return;
    }
    const newData = {
      tenTro: nhatro.tenTro,
      tienphong: parseInt(tienPhong?.replaceAll(",", "")),
      tienrac: parseInt(tienrac?.replaceAll(",", "")),
      tiennuoc: parseInt(tiennuoc?.replaceAll(",", "")),
      tiendien: parseInt(tiendien?.replaceAll(",", "")),
      tienkhac: parseInt(tienkhac?.replaceAll(",", "")),
      chungchu: chungchu === "Có",
      dieuhoa: dieuhoa === "Có",
      nonglanh: nonglanh === "Có",
      wifi: wifi === "Có",
      ngay_thu_tien: setngaychot,
    };
    // console.log(newData);
    // return;
    if (Object.keys(newData).length > 0) {
      setIsloading(true);
      api
        .patch(`/nhatro/${nhatro.id}/`, newData, token)
        .then((response1) => {
          console.log("Cập nhật thành công", response1);
          api
            .get("/my_nhatro/", token)
            .then((response) => {
              onUserUpdate(response.results);
              handleBack(response1);
            })
            .catch((error) => {
              console.error("Lỗi khi lấy thông tin nhà trọ:", error);
            })
            .finally(() => {
              setIsloading(false);
            });
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật:", error);
        });
    } else {
      console.log("Không có sự thay đổi nào để cập nhật.");
    }
  };
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Back");
      handleBack();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });
  return (
    <>
      <div className="title2">{nhatro.tenTro}</div>
      <div className="text-[13px] text-center">
        Ap dụng chung cho tất cả phòng trọ
      </div>
      <div className="body-container">
        <div className="form-update flex flex-col gap-1 flex-1">
          <table>
            <tbody>
              <tr>
                <td>Kiểu thanh toán</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <select disabled>
                      <option>Thanh toán sau</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Ngày chốt hàng tháng</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      type="number" // Uses the telephone input for numeric values
                      name="ngaychot"
                      value={ngaychot}
                      max={31}
                      onChange={(e) => {
                        setngaychot(e.target.value);
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền phòng chung</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      pattern="^[0-9]*$" // Only allow digits and commas
                      inputMode="numeric" // Mobile devices show numeric keyboard
                      type="tel" // Uses the telephone input for numeric values
                      name="tienphong"
                      value={tienPhong}
                      className="money"
                      placeholder="Enter a number"
                      onChange={(e) => {
                        let newValue = e.target.value;
                        newValue = newValue.replace(/[^0-9]/g, "");
                        if (newValue) {
                          newValue = newValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                        }
                        setTienPhong(newValue);
                      }}
                    />
                    <div className="unit">1 tháng</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền rác</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      pattern="^[0-9]*$" // Only allow digits and commas
                      inputMode="numeric" // Mobile devices show numeric keyboard
                      type="tel" // Uses the telephone input for numeric values
                      name="tienrac"
                      value={tienrac}
                      className="money"
                      placeholder="Enter a number"
                      onChange={(e) => {
                        let newValue = e.target.value;
                        newValue = newValue.replace(/[^0-9]/g, "");
                        if (newValue) {
                          newValue = newValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                        }
                        settienrac(newValue);
                      }}
                    />
                    <div className="unit">1 tháng</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền nước</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      pattern="^[0-9]*$" // Only allow digits and commas
                      inputMode="numeric" // Mobile devices show numeric keyboard
                      type="tel" // Uses the telephone input for numeric values
                      name="tiennuoc"
                      value={tiennuoc}
                      placeholder="Enter a number"
                      className="money"
                      onChange={(e) => {
                        let newValue = e.target.value;
                        newValue = newValue.replace(/[^0-9]/g, "");
                        if (newValue) {
                          newValue = newValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                        }
                        settiennuoc(newValue);
                      }}
                    />
                    <div className="unit">1 khối</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền điện</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      pattern="^[0-9]*$" // Only allow digits and commas
                      inputMode="numeric" // Mobile devices show numeric keyboard
                      type="tel" // Uses the telephone input for numeric values
                      name="tiendien"
                      value={tiendien}
                      className="money"
                      placeholder="Enter a number"
                      onChange={(e) => {
                        let newValue = e.target.value;
                        newValue = newValue.replace(/[^0-9]/g, "");
                        if (newValue) {
                          newValue = newValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                        }
                        settiendien(newValue);
                      }}
                    />
                    <div className="unit">1 số</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền khác</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      pattern="^[0-9]*$" // Only allow digits and commas
                      inputMode="numeric" // Mobile devices show numeric keyboard
                      type="tel" // Uses the telephone input for numeric values
                      name="tienkhac"
                      className="money"
                      value={tienkhac}
                      placeholder="Enter a number"
                      onChange={(e) => {
                        let newValue = e.target.value;
                        newValue = newValue.replace(/[^0-9]/g, "");
                        if (newValue) {
                          newValue = newValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                        }
                        settienkhac(newValue);
                      }}
                    />
                    <div className="unit">1 số</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Chung chủ</td>
                <td>
                  <select
                    name="chungchu"
                    value={chungchu}
                    onChange={(e) => setChungchu(e.target.value)}
                  >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Điều hòa</td>
                <td>
                  <select
                    name="dieuhoa"
                    value={dieuhoa}
                    onChange={(e) => setDieuhoa(e.target.value)}
                  >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Nóng lạnh</td>
                <td>
                  <select
                    name="nonglanh"
                    value={nonglanh}
                    onChange={(e) => setNonglanh(e.target.value)}
                  >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Wifi</td>
                <td>
                  <select
                    name="wifi"
                    value={wifi}
                    onChange={(e) => setWifi(e.target.value)}
                  >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-auto flex justify-between pt-3">
            <div className="add back" onClick={handleBack}>
              <div className="add-box">
                <div className="icon">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="text">Quay lại</div>
              </div>
            </div>
            <div className="add" onClick={handleSave}>
              <div className="add-box">
                <div className="icon">
                  {isLoading ? (
                    <div className="loading-spinner" />
                  ) : (
                    <i className="fa-solid fa-cloud-arrow-down"></i>
                  )}
                </div>
                <div className="text">Lưu cài đặt</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_nhatro;
