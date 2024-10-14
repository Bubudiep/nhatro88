import React, { useState } from "react";

const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);

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
    setIsUpdate(updateData);
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

    // Gọi API để lưu lại thông tin đã cập nhật (nếu có)
    console.log("Cập nhật thông tin nhà trọ: ", updatedTro);

    // Ví dụ gọi API (nếu bạn có API thực tế để cập nhật):
    // axios.post('/api/update/nhatro', updatedTro)
    //   .then(response => console.log('Cập nhật thành công', response))
    //   .catch(error => console.error('Cập nhật thất bại', error));

    // Sau khi lưu thành công, quay lại danh sách nhà trọ
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
          <>
            <div className="title">Cập nhật {isUpdate.tenTro}</div>
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
                      <td>{isUpdate.tienrac ?? 0} vnđ</td>
                    </tr>
                    <tr>
                      <td>Tiền nước</td>
                      <td>{isUpdate.tiennuoc ?? 0} vnđ (1 khối)</td>
                    </tr>
                    <tr>
                      <td>Tiền điện</td>
                      <td>{isUpdate.tiendien ?? 0} vnđ (1 số)</td>
                    </tr>
                    <tr>
                      <td>Giá phòng thấp nhất</td>
                      <td>{isUpdate.giaphongThapnhat}</td>
                    </tr>
                    <tr>
                      <td>Giá phòng cao nhất</td>
                      <td>{isUpdate.giaphongCaonhat}</td>
                    </tr>
                    <tr>
                      <td>Chung chủ</td>
                      <td>
                        <input
                          type="checkbox"
                          name="chungchu"
                          defaultChecked={isUpdate.chungchu}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Điều hòa</td>
                      <td>
                        <input
                          type="checkbox"
                          name="dieuhoa"
                          defaultChecked={isUpdate.dieuhoa}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Nóng lạnh</td>
                      <td>
                        <input
                          type="checkbox"
                          name="nonglanh"
                          defaultChecked={isUpdate.nonglanh}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Wifi</td>
                      <td>
                        <input
                          type="checkbox"
                          name="wifi"
                          defaultChecked={isUpdate.wifi}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-auto">
                  <div className="add" onClick={handleSave}>
                    <div className="add-box">
                      <div className="text">Lưu lại</div>
                    </div>
                  </div>
                  <div
                    className="add back"
                    onClick={() => {
                      setIsUpdate(false);
                    }}
                  >
                    <div className="add-box">
                      <div className="text">Quay lại</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ListNhatro;
