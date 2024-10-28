import React, { useEffect, useState } from "react";

const View_nhatro = ({ nhatro, handleEdittro, handlePhongtro, handleBack }) => {
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [longPressRooms, setLongPressRooms] = useState([]); // State chứa danh sách phòng đang long press
  const handleLongPress = (phong) => {
    console.log(phong);
  };
  const handleSelectAll = () => {
    const phong = nhatro.Thongtin.flatMap((tt) => tt.Chitiet);
    setLongPressRooms((prevRooms) => {
      const newRoomIds = phong
        .filter((phong) => !prevRooms.includes(phong.id)) // Lọc ra các phòng chưa có trong prevRooms
        .map((phong) => phong.id); // Lấy danh sách các id
      console.log(newRoomIds);
      return [...prevRooms, ...newRoomIds];
    });
  };
  const startLongPress = (phong) => {
    const timer = setTimeout(() => {
      setLongPressRooms((prevRooms) => {
        if (!prevRooms.includes(phong.id)) {
          return [...prevRooms, phong.id];
        }
        return prevRooms;
      });
      handleLongPress(phong);
      setIsMultiSelect(true);
    }, 500);
    setLongPressTimer(timer);
  };
  const cancelLongPress = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
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
  return (
    <>
      <div className="title2">{nhatro.tenTro}</div>
      <div className="text-[13px] h-[35px] flex items-center justify-center">
        {isMultiSelect ? (
          <div className="flex gap-2 pl-3 pr-3">
            <button className="edit mt-2" onClick={handleSelectAll}>
              <div className="icon">
                <i className="fa-solid fa-check"></i>
              </div>
              Chọn toàn bộ
            </button>
            <button className="edit mt-2">
              <div className="icon">
                <i className="fa-solid fa-marker"></i>
              </div>
              Sửa hàng loạt
            </button>
          </div>
        ) : (
          "Chọn một phòng hoặc bấm giữ để cài đặt"
        )}
      </div>
      <div className="body-container">
        <div className="list_item_big">
          {nhatro.Thongtin.map((item) => (
            <div key={item.id} className="nhatro-item layout">
              <div className="tang_name">{item.tenTang}</div>
              <div className="list_phong">
                {item.Chitiet.map((phong) => (
                  <div
                    key={phong.id}
                    className={`items ${
                      phong.Nguoitro.length > 0
                        ? phong.Nguoitro.length >= 2
                          ? "full"
                          : "online"
                        : "offline"
                    } ${
                      longPressRooms.includes(phong.id)
                        ? "long-press-class"
                        : ""
                    }`} // Thêm class nếu phòng đang long press
                    onTouchStart={() => startLongPress(phong)} // Sự kiện long press trên thiết bị di động
                    onTouchEnd={() => cancelLongPress(phong)} // Hủy nếu người dùng nhả tay
                    onClick={() => {
                      if (isMultiSelect) {
                        if (!longPressRooms.includes(phong.id)) {
                          // Nếu phòng chưa có trong danh sách, thêm vào
                          setLongPressRooms((prevRooms) => {
                            if (!prevRooms.includes(phong.id)) {
                              return [...prevRooms, phong.id];
                            }
                            return prevRooms;
                          });
                          console.log("added");
                        } else {
                          // Nếu phòng đã có trong danh sách, xóa ra
                          console.log(longPressRooms.length);
                          setLongPressRooms((prevRooms) =>
                            prevRooms.filter((roomId) => roomId !== phong.id)
                          );
                          if (longPressRooms.length == 1) {
                            console.log("last room removed");
                            setIsMultiSelect(false); // Có thể kích hoạt lại nếu cần
                          }
                        }
                      } else {
                        console.log("single click");
                        handlePhongtro(phong); // Thực hiện hành động mặc định
                      }
                    }}
                  >
                    <div className="status">
                      {phong.Nguoitro.length == 0 ? (
                        <i className="fa-solid fa-door-open"></i>
                      ) : (
                        <i className="fa-solid fa-door-closed"></i>
                      )}
                    </div>
                    <div className="name">
                      {phong.soPhong
                        .replaceAll("Phòng", "P")
                        .replaceAll(" ", "")}{" "}
                      <div className="sub">
                        {phong.Nguoitro.length == 0 ? (
                          "Trống"
                        ) : phong.Nguoitro.length >= 2 ? (
                          "Đầy"
                        ) : (
                          <>
                            {phong.Nguoitro.length}{" "}
                            <i className="fa-regular fa-user"></i>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          <div className="add" onClick={handleEdittro}>
            <div className="add-box">
              <div className="icon">
                <i className="fa-solid fa-gear"></i>
              </div>
              <div className="text">Cài đặt {nhatro.tenTro}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View_nhatro;
