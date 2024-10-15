import React, { useState } from "react";

const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [slideDanhsach, setSlideDanhsach] = useState("");
  const [slideNhatro, setSlideNhatro] = useState("");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // Gọi onClose mà không cần truyền tham số alert
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };

  // Hàm cập nhật thông tin người dùng (nếu cần)
  const handleUpdateUser = (newUserData) => {
    if (onUserUpdate) {
      onUserUpdate(newUserData); // Gọi hàm callback để cập nhật người dùng
    }
  };

  // Hàm hiển thị dữ liệu nhà trọ để cập nhật
  const handleUpdateTro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
    }, 200); // Đặt thời gian trễ là 300ms
  };
  const handleBack = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsUpdate(null);
    }, 200); // Đặt thời gian trễ là 300ms
  };
  // Hàm xử lý khi bấm "Lưu lại"
  const handleSave = () => {
    // Chuẩn bị dữ liệu mới sau khi người dùng thay đổi
    const updatedTro = {
      ...isUpdate,
      chungchu: document.querySelector('input[name="chungchu"]').checked,
      dieuhoa: document.querySelector('input[name="dieuhoa"]').checked,
      nonglanh: document.querySelector('input[name="nonglanh"]').checked,
      wifi: document.querySelector('input[name="wifi"]').checked,
    };
    console.log("Cập nhật thông tin nhà trọ: ", updatedTro);
    setIsUpdate(false);
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
                          <input type="number" value={isUpdate.tienrac ?? 0} />
                          <div className="unit">1 tháng</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền nước</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input type="number" value={isUpdate.tiennuoc ?? 0} />
                          <div className="unit">1 khối</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền điện</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input type="number" value={isUpdate.tiendien ?? 0} />
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
                            value={isUpdate.giaphongThapnhat ?? 0}
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
                            value={isUpdate.giaphongCaonhat ?? 0}
                          />
                          <div className="unit">vnđ</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Chung chủ</td>
                      <td>
                        <select>
                          <option selected={isUpdate.chungchu}>Có</option>
                          <option selected={!isUpdate.chungchu}>Không</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Điều hòa</td>
                      <td>
                        <select>
                          <option selected={isUpdate.dieuhoa}>Có</option>
                          <option selected={!isUpdate.dieuhoa}>Không</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Nóng lạnh</td>
                      <td>
                        <select>
                          <option selected={isUpdate.nonglanh}>Có</option>
                          <option selected={!isUpdate.nonglanh}>Không</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Wifi</td>
                      <td>
                        <select>
                          <option selected={isUpdate.wifi}>Có</option>
                          <option selected={!isUpdate.wifi}>Không</option>
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
