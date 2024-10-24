import React from "react";

const List_nhatro = ({
  user,
  handleThemnhatro,
  handleUpdateTro,
  handleViewnhatro,
}) => {
  return (
    <>
      <div className="title2">Danh sách nhà trọ</div>
      <div className="body-container">
        <div className="list_item_big">
          {user?.nhatro.map((item) => (
            <div
              key={item.id}
              className="nhatro-item"
              onClick={() => handleViewnhatro(item.id)}
            >
              <div className={`details ${item.isActive ? "active" : "stop"}`}>
                <div className="i-info">
                  <div className="name i-title">{item.tenTro}</div>
                  <div className="value">
                    {item.isActive ? (
                      <div className="status active">Đang hoạt động</div>
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
                    {item.tienphong.toLocaleString("vi-VN")}đ
                  </div>
                </div>
                <div className="i-info">
                  <div className="name">Tiền điện</div>
                  <div className="value">
                    {item.tiendien.toLocaleString("vi-VN")}đ / 1 số
                  </div>
                </div>
                <div className="i-info">
                  <div className="name">Tiền nước</div>
                  <div className="value">
                    {item.tiennuoc.toLocaleString("vi-VN")}đ / 1 khối
                  </div>
                </div>
                <div className="i-info">
                  <div className="name">Tiền rác</div>
                  <div className="value">
                    {item.tienrac.toLocaleString("vi-VN")}đ / tháng
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
                    <div className={`items ${item.wifi ? "on" : "off"}`}>
                      {item.wifi ? "Có" : "Không"} Wifi
                    </div>
                    <div className={`items ${item.dieuhoa ? "on" : "off"}`}>
                      {item.dieuhoa ? "Có" : "Không"} Điều hòa
                    </div>
                    <div className={`items ${item.nonglanh ? "on" : "off"}`}>
                      {item.nonglanh ? "Có" : "Không"} Nóng lạnh
                    </div>
                    <div className={`items ${!item.chungchu ? "on" : "off"}`}>
                      {item.chungchu ? "" : "Không"} Chung chủ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {user?.app?.level > 0 && (
          <div className="mt-auto">
            <div className="add" onClick={handleThemnhatro}>
              <div className="add-box">
                <div className="icon">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <div className="text">Thêm nhà trọ</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List_nhatro;
