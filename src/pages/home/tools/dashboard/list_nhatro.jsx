import React, { useState } from "react";
import api from "../../../../components/api";
const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [slideDanhsach, setSlideDanhsach] = useState("");
  const [slideNhatro, setSlideNhatro] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleUpdateUser = (newUserData) => {
    if (onUserUpdate) {
      onUserUpdate(newUserData);
    }
  };

  const handleUpdateTro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
    }, 200);
  };

  const handleBack = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsUpdate(null);
    }, 200);
  };

  const handleSave = () => {
    if (!isUpdate) return;

    // Dữ liệu cũ (dữ liệu trước khi cập nhật)
    const oldData = user.nhatro.find((nhatro) => nhatro.id === isUpdate.id);

    // Dữ liệu mới lấy từ các trường nhập
    const newData = {
      tenTro: isUpdate.tenTro,
      tienrac: document.querySelector('input[name="tienrac"]').value,
      tiennuoc: document.querySelector('input[name="tiennuoc"]').value,
      tiendien: document.querySelector('input[name="tiendien"]').value,
      giaphongThapnhat: document.querySelector('input[name="giaphongThapnhat"]')
        .value,
      giaphongCaonhat: document.querySelector('input[name="giaphongCaonhat"]')
        .value,
      chungchu:
        document.querySelector('select[name="chungchu"]').value === "Có",
      dieuhoa: document.querySelector('select[name="dieuhoa"]').value === "Có",
      nonglanh:
        document.querySelector('select[name="nonglanh"]').value === "Có",
      wifi: document.querySelector('select[name="wifi"]').value === "Có",
    };

    // So sánh dữ liệu mới với dữ liệu cũ
    const updatedFields = {};
    for (let key in newData) {
      if (newData[key] !== oldData[key]) {
        updatedFields[key] = newData[key]; // Lưu lại các trường đã thay đổi
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      // Nếu có sự thay đổi thì gửi request PATCH
      api
        .patch(`/api/nhatro/${isUpdate.id}/`, updatedFields)
        .then((response) => {
          console.log("Cập nhật thành công", response.data);
          // Cập nhật dữ liệu mới vào danh sách user.nhatro
          handleUpdateUser(response.data);
          handleBack(); // Quay lại danh sách
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật:", error);
        });
    } else {
      console.log("Không có sự thay đổi nào để cập nhật.");
    }
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>

        {isUpdate ? (
          <div className={`slider ${slideNhatro}`}>
            <div className="title">{isUpdate.tenTro}</div>
            <div className="body-container">
              <div className="form-update flex flex-col gap-1 flex-1">
                <table>
                  <tbody>
                    <tr>
                      <td>Tên trọ</td>
                      <td>{isUpdate.tenTro}</td>
                    </tr>
                    <tr>
                      <td>Tiền rác</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input
                            type="number"
                            name="tienrac"
                            defaultValue={isUpdate.tienrac ?? 0}
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
                            defaultValue={isUpdate.tiennuoc ?? 0}
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
                            defaultValue={isUpdate.tiendien ?? 0}
                          />
                          <div className="unit">1 số</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Giá phòng thấp nhất</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input
                            type="number"
                            name="giaphongThapnhat"
                            defaultValue={isUpdate.giaphongThapnhat ?? 0}
                          />
                          <div className="unit">vnđ</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Giá phòng cao nhất</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input
                            type="number"
                            name="giaphongCaonhat"
                            defaultValue={isUpdate.giaphongCaonhat ?? 0}
                          />
                          <div className="unit">vnđ</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Chung chủ</td>
                      <td>
                        <select name="chungchu">
                          <option value="Có" selected={isUpdate.chungchu}>
                            Có
                          </option>
                          <option value="Không" selected={!isUpdate.chungchu}>
                            Không
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Điều hòa</td>
                      <td>
                        <select name="dieuhoa">
                          <option value="Có" selected={isUpdate.dieuhoa}>
                            Có
                          </option>
                          <option value="Không" selected={!isUpdate.dieuhoa}>
                            Không
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Nóng lạnh</td>
                      <td>
                        <select name="nonglanh">
                          <option value="Có" selected={isUpdate.nonglanh}>
                            Có
                          </option>
                          <option value="Không" selected={!isUpdate.nonglanh}>
                            Không
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Wifi</td>
                      <td>
                        <select name="wifi">
                          <option value="Có" selected={isUpdate.wifi}>
                            Có
                          </option>
                          <option value="Không" selected={!isUpdate.wifi}>
                            Không
                          </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-auto">
                  <div className="add back" onClick={handleBack}>
                    <div className="add-box">
                      <div className="text">Quay lại</div>
                    </div>
                  </div>
                  <div className="add" onClick={handleSave}>
                    <div className="add-box">
                      <div className="text">Lưu cài đặt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`slider ${slideDanhsach}`}>
            <div className="title">Danh sách nhà trọ</div>
            <div className="body-container">
              <div className="list_item_big">
                {user?.nhatro.map((item) => (
                  <div
                    key={item.id}
                    className="nhatro-item"
                    onClick={() => handleUpdateTro(item.id)}
                  >
                    <div
                      className={`details ${item.isActive ? "active" : "stop"}`}
                    >
                      <div className="i-info">
                        <div className="name i-title">{item.tenTro}</div>
                        <div className="value">
                          {item.isActive ? (
                            <div className="status active">Hoạt động</div>
                          ) : (
                            <div className="status stop">Tạm dừng</div>
                          )}
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name">Đang ở</div>
                        <div className="value">
                          <div className="bold">
                            {item.Thongtin.reduce((total, tang) => {
                              return (
                                total +
                                tang.Chitiet.filter(
                                  (phong) => phong.Nguoitro.length > 0
                                ).length
                              );
                            }, 0)}
                          </div>
                          /
                          <div className="bold">
                            {item.Thongtin.reduce((total, tang) => {
                              return total + tang.Chitiet.length;
                            }, 0)}
                          </div>{" "}
                          phòng
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name">Giá phòng</div>
                        <div className="value">
                          {item.giaphongThapnhat ? (
                            item.giaphongThapnhat + " vnđ"
                          ) : (
                            <div className="null">0 vnđ</div>
                          )}
                          {" - "}
                          {item.giaphongCaonhat ? (
                            item.giaphongCaonhat + " vnđ"
                          ) : (
                            <div className="null">0 vnđ</div>
                          )}
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name">Địa chỉ</div>
                        <div className="value">
                          {item.diachi ?? <div className="null">-</div>}
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="i-details">
                          <div className="items">
                            {item.wifi ? "Có" : "Không"} Wifi
                          </div>
                          <div className="items">
                            {item.dieuhoa ? "Có" : "Không"} Điều hòa
                          </div>
                          <div className="items">
                            {item.nonglanh ? "Có" : "Không"} Nóng lạnh
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="view">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add">
                <div className="add-box">
                  <div className="icon">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="text">Thêm nhà trọ</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNhatro;
