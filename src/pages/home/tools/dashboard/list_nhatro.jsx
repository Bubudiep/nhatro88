import React, { useState } from "react";
import api from "../../../../components/api";
import house_mini from "../../../../img/house_mini.png";
const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isThemtro, setIsThemTro] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [slideDanhsach, setSlideDanhsach] = useState("");
  const [slideNhatro, setSlideNhatro] = useState("");
  const [themtroError, setThemtroError] = useState("");

  // Khởi tạo state cho các trường select
  const [chungchu, setChungchu] = useState("Có");
  const [dieuhoa, setDieuhoa] = useState("Có");
  const [nonglanh, setNonglanh] = useState("Có");
  const [wifi, setWifi] = useState("Có");

  const [tenNhatro, setTenNhatro] = useState("Nhà trọ A");
  const [tangs, setTangs] = useState([
    { soTang: 1, phongBatDau: 1, phongKetThuc: 5 }, // Tầng 1 mặc định
  ]);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const themTangMoi = () => {
    setTangs([
      ...tangs,
      { soTang: tangs.length + 1, phongBatDau: 1, phongKetThuc: 5 },
    ]);
  };
  const handlePhongChange = (index, field, value) => {
    const newTangs = tangs.map((tang, i) => {
      if (i === index) {
        return { ...tang, [field]: value };
      }
      return tang;
    });
    setTangs(newTangs);
  };
  const handleSubmit = () => {
    const data = {
      tenTro: tenNhatro,
      tangs: tangs, // Gửi dữ liệu các tầng lên API
    };
    setLoading(true); // Bắt đầu loading
    api
      .post("/nha-tro/", data, user.app.access_token)
      .then((response) => {
        api
          .get("/my_nhatro/", user.app.access_token)
          .then((response) => {
            onUserUpdate(response.results);
            handleBack2();
          })
          .catch((error) => {
            console.error("Lỗi khi lấy thông tin nhà trọ:", error);
          });
      })
      .catch((error) => {
        setThemtroError("Lỗi khi tạo nhà trọ: " + error?.response?.data?.Error);
        console.error("Lỗi khi tạo nhà trọ:", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleThemnhatro = (e) => {
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsThemTro(true);
    }, 200);
  };
  const handleUpdateTro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
      setChungchu(updateData.chungchu ? "Có" : "Không");
      setDieuhoa(updateData.dieuhoa ? "Có" : "Không");
      setNonglanh(updateData.nonglanh ? "Có" : "Không");
      setWifi(updateData.wifi ? "Có" : "Không");
    }, 200);
  };

  const handleBack = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsUpdate(null);
    }, 200);
  };
  const handleBack2 = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsThemTro(false);
    }, 200);
  };

  const handleSave = () => {
    if (!isUpdate) return;

    const oldData = user.nhatro.find((nhatro) => nhatro.id === isUpdate.id);

    const newData = {
      tenTro: isUpdate.tenTro,
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
      if (newData[key] !== oldData[key]) {
        updatedFields[key] = newData[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      api
        .patch(`/nhatro/${isUpdate.id}/`, updatedFields, user.app.access_token)
        .then((response) => {
          console.log("Cập nhật thành công", response);
          api
            .get("/my_nhatro/", user.app.access_token)
            .then((response) => {
              onUserUpdate(response.results);
              handleBack();
            })
            .catch((error) => {
              console.error("Lỗi khi lấy thông tin nhà trọ:", error);
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
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        {isThemtro ? ( // Step 2: Form điền chi tiết nhà trọ
          <div
            className={`slider p-[20px] message-box fade-in-5 gap-2 flex flex-col ${slideNhatro}`}
          >
            <div className="flex justify-center p-3">
              <img className="w-14" src={house_mini} alt="House mini" />
            </div>
            <div className="text-[18px] p-2 text-center text-[#ff9137]">
              Thêm một nhà trọ
            </div>
            {themtroError && (
              <div className="error-message">{themtroError}</div>
            )}
            <div className="form-phongtro new">
              <table>
                <tbody>
                  <tr>
                    <td>Tên trọ</td>
                    <td>
                      <input
                        type="text"
                        value={tenNhatro}
                        onChange={(e) => setTenNhatro(e.target.value)}
                      />
                    </td>
                  </tr>

                  {tangs.map((tang, index) => (
                    <tr key={index}>
                      <td>Tầng {tang.soTang}</td>
                      <td>
                        <div className="flex gap-1 items-center justify-end">
                          Phòng
                          <input
                            type="number"
                            value={tang.phongBatDau}
                            onChange={(e) =>
                              handlePhongChange(
                                index,
                                "phongBatDau",
                                e.target.value
                              )
                            }
                          />{" "}
                          đến{" "}
                          <input
                            type="number"
                            value={tang.phongKetThuc}
                            onChange={(e) =>
                              handlePhongChange(
                                index,
                                "phongKetThuc",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="add-tang text-[15px] mt-4"
                onClick={themTangMoi}
              >
                Thêm tầng
              </button>
              <button className="add-tang text-[15px]" onClick={handleBack2}>
                Quay lại
              </button>
            </div>
            <div className="tools-container">
              <div className="options main flex">
                <button className="add w-full h-[50px]" onClick={handleSubmit}>
                  {loading ? (
                    <div className="flex gap-5 justify-center items-center">
                      <div className="loading-spinner-in"></div>Loading...
                    </div>
                  ) : (
                    "Thêm nhà trọ"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : isUpdate ? (
          <div className={`slider fade-in-5 ${slideNhatro}`}>
            <div className="title2">{isUpdate.tenTro}</div>
            <div className="body-container">
              <div className="form-update flex flex-col gap-1 flex-1">
                <table>
                  <tbody>
                    <tr>
                      <td>Tiền phòng chung</td>
                      <td>
                        <div className="flex relative justify-end items-center">
                          <input
                            type="number"
                            name="tienphong"
                            defaultValue={isUpdate.tienphong ?? 0}
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
          <div className={`slider fade-in-5 ${slideDanhsach}`}>
            <div className="title2">Danh sách nhà trọ</div>
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
                          <div className="items">
                            {item.wifi ? "Có" : "Không"} Wifi
                          </div>
                          <div className="items">
                            {item.dieuhoa ? "Có" : "Không"} Điều hòa
                          </div>
                          <div className="items">
                            {item.nonglanh ? "Có" : "Không"} Nóng lạnh
                          </div>
                          <div className="items">
                            {item.chungchu ? "Có" : "Không"} Chung chủ
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
              <div className="add" onClick={handleThemnhatro}>
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
