import React, { useEffect, useState } from "react";
import { Text } from "zmp-ui";
import api from "../../../../../components/api";

const Chitiet_phong = ({ phong, handleBack, token, onUserUpdate }) => {
  console.log(phong);
  const [isLoading, setIsloading] = useState(false);
  const [giaPhong, setGiaPhong] = useState(phong.giaPhong);
  const [tiendien, settiendien] = useState(phong.tiendien);
  const [tiennuoc, settiennuoc] = useState(phong.tiennuoc);
  const [tienrac, settienrac] = useState(phong.tienrac);
  const [tienkhac, settienkhac] = useState(phong.tienkhac);
  const [sodien, setsodien] = useState(phong.sodien);
  const [sonuoc, setsonuoc] = useState(phong.sonuoc);
  const [nonglanh, setnonglanh] = useState(phong.nonglanh ? "Có" : "Không");
  const [dieuhoa, setdieuhoa] = useState(phong.dieuhoa ? "Có" : "Không");
  const [wifi, setwifi] = useState(phong.wifi ? "Có" : "Không");
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Back");
      handleBack();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      history.pushState(null, "", window.location.href);
      window.removeEventListener("popstate", handlePopState);
    };
  });
  const handleSave = () => {
    if (!phong) {
      return;
    }
    const newData = {
      giaphong: giaPhong,
      dieuhoa: dieuhoa === "Có",
      nonglanh: nonglanh === "Có",
      wifi: wifi === "Có",
      phong: phong.id,
      sodien: sodien,
      sonuoc: sonuoc,
      tiendien: tiendien,
      tiennuoc: tiennuoc,
      tienrac: tienrac,
      tienkhac: tienkhac,
    };
    const updatedFields = {};
    for (let key in newData) {
      if (newData[key] !== phong[key]) {
        updatedFields[key] = newData[key];
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      setIsloading(true);
      api
        .post(`/u-phong/`, newData, token)
        .then((response1) => {
          console.log("Cập nhật thành công", response1);
          api
            .get("/my_nhatro/", token)
            .then((response) => {
              onUserUpdate(response.results);
              handleBack(response1.tro_hientai);
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
  const moveCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Di chuyển con trỏ đến cuối
    selection.removeAllRanges();
    selection.addRange(range);
  };
  return (
    <>
      <div className="title2">
        {phong.soPhong} - {phong.tenTang}
      </div>
      <div className="body-container">
        <div className="form-update flex-1">
          <div className="h3 pt-1 pb-1">
            <div className="name">
              <i className="fa-solid fa-user-group"></i> Đang ở
            </div>
          </div>
          <div className="list-group">
            {phong.Nguoitro.length > 0 ? (
              <>
                {phong.Nguoitro.map((nguoitro) => (
                  <div key={nguoitro.id} className="items">
                    <div className="user-info">
                      <div className="it-1">
                        <div className="name">
                          {nguoitro.ThongtinNguoiTro.hoTen}
                        </div>
                        <div
                          className={`value ${nguoitro.ThongtinNguoiTro.tamtru}`}
                        >
                          {nguoitro.ThongtinNguoiTro.tamtru
                            ? "Đã tạm trú"
                            : "Chưa tạm trú"}
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Liên hệ</div>
                        <div className="value">
                          {nguoitro.ThongtinNguoiTro.sdt}
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Tiền cọc</div>
                        <div className="value">
                          {nguoitro.tiencoc.toLocaleString("vi-VN")} vnđ
                        </div>
                      </div>
                      <div className="it-2">
                        <div className="name">Ngày vào</div>
                        <div className="value">{nguoitro.ngayBatdauO}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="null">
                <div className="logo">
                  <i className="fa-solid fa-people-pulling"></i>
                </div>
                <div className="message">Danh sách trống</div>
              </div>
            )}
          </div>
          <div className="h3 pt-1 pb-1">
            <div className="name">
              <i className="fa-solid fa-gear"></i> Cài đặt nhanh
            </div>
          </div>
          <div className="list-group">
            <div className="items">
              <div className="user-info gap-[2px]">
                <div className="it-2">
                  <div className="name">Nóng lạnh</div>
                  <div className="value">
                    <select
                      name="nonglanh"
                      value={nonglanh}
                      onChange={(e) => setnonglanh(e.target.value)}
                    >
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                    </select>
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Điều hòa</div>
                  <div className="value">
                    <select
                      name="dieuhoa"
                      value={dieuhoa}
                      onChange={(e) => setdieuhoa(e.target.value)}
                    >
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                    </select>
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Wifi</div>
                  <div className="value">
                    <select
                      name="wifi"
                      value={wifi}
                      onChange={(e) => setwifi(e.target.value)}
                    >
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                    </select>
                  </div>
                </div>
                <div className="split" />
                <div className="it-2">
                  <div className="name">Giá phòng</div>
                  <div className="value">
                    <div
                      className="input"
                      name="giaPhong"
                      contentEditable={true}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      onInput={(e) => {
                        setGiaPhong(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(giaPhong).toLocaleString("vi-VN")}
                    </div>
                    vnđ
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Tiền điện</div>
                  <div className="value">
                    <div
                      className="input"
                      name="tiendien"
                      contentEditable={true}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      onInput={(e) => {
                        settiendien(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(tiendien).toLocaleString("vi-VN")}
                    </div>
                    vnđ
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Tiền nước</div>
                  <div className="value">
                    <div
                      className="input"
                      name="tiennuoc"
                      contentEditable={true}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      onInput={(e) => {
                        settiennuoc(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(tiennuoc).toLocaleString("vi-VN")}
                    </div>
                    vnđ
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Tiền rác</div>
                  <div className="value">
                    <div
                      className="input"
                      name="tienrac"
                      contentEditable={true}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      onInput={(e) => {
                        settienrac(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(tienrac).toLocaleString("vi-VN")}
                    </div>
                    vnđ
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Tiền khác</div>
                  <div className="value">
                    <div
                      className="input"
                      name="tienkhac"
                      contentEditable={true}
                      onInput={(e) => {
                        settienkhac(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(tienkhac).toLocaleString("vi-VN")}
                    </div>
                    vnđ
                  </div>
                </div>
                <div className="split" />
                <div className="it-2">
                  <div className="name">Số điện hiện tại</div>
                  <div className="value">
                    <div
                      className="input"
                      name="sodien"
                      contentEditable={true}
                      onInput={(e) => {
                        setsodien(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(sodien)}
                    </div>
                  </div>
                </div>
                <div className="it-2">
                  <div className="name">Số nước hiện tại</div>
                  <div className="value">
                    <div
                      className="input"
                      name="sonuoc"
                      contentEditable={true}
                      onInput={(e) => {
                        setsonuoc(e.target.innerText.replace(/\D/g, ""));
                        moveCursorToEnd(e.target);
                      }}
                      onClick={(e) => {
                        moveCursorToEnd(e.target);
                      }}
                      suppressContentEditableWarning={true}
                    >
                      {Number(sonuoc)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default Chitiet_phong;
