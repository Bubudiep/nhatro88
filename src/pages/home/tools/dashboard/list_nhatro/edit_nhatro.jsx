import React, { useState } from "react";
import api from "../../../../../components/api";

const Edit_nhatro = ({ nhatro, handleBack, onUserUpdate, token }) => {
  const [isLoading, setIsloading] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [chungchu, setChungchu] = useState(nhatro.chungchu ? "Có" : "Không");
  const [dieuhoa, setDieuhoa] = useState(nhatro?.dieuhoa ? "Có" : "Không");
  const [nonglanh, setNonglanh] = useState(nhatro?.nonglanh ? "Có" : "Không");
  const [wifi, setWifi] = useState(nhatro?.wifi ? "Có" : "Không");
  const handleSave = () => {
    if (!nhatro) {
      return;
    }
    const newData = {
      tenTro: nhatro.tenTro,
      tienphong: document.querySelector('input[name="tienphong"]').value,
      tienrac: document.querySelector('input[name="tienrac"]').value,
      tiennuoc: document.querySelector('input[name="tiennuoc"]').value,
      tiendien: document.querySelector('input[name="tiendien"]').value,
      chungchu: chungchu === "Có",
      dieuhoa: dieuhoa === "Có",
      nonglanh: nonglanh === "Có",
      wifi: wifi === "Có",
    };
    const updatedFields = {};
    for (let key in newData) {
      if (newData[key] !== nhatro[key]) {
        updatedFields[key] = newData[key];
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      setIsloading(true);
      api
        .patch(`/nhatro/${nhatro.id}/`, updatedFields, token)
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
                    <select>
                      <option>Thanh toán sau</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tiền phòng chung</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input
                      type="number"
                      name="tienphong"
                      defaultValue={nhatro.tienphong ?? 0}
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
                      type="number"
                      name="tienrac"
                      defaultValue={nhatro.tienrac ?? 0}
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
                      type="number"
                      name="tiennuoc"
                      defaultValue={nhatro.tiennuoc ?? 0}
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
                      type="number"
                      name="tiendien"
                      defaultValue={nhatro.tiendien ?? 0}
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
