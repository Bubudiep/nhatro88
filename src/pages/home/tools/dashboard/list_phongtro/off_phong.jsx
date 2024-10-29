import React, { useEffect, useState } from "react";

const Off_phong = ({ user, handleClose, handleEditTro }) => {
  const [selectedNhatro, setSelectedNhatro] = useState(user.nhatro[0].id);
  const [selectedTang, setSelectedTang] = useState("");
  const filterPhongtro2 = (nhatro) => {
    const tro = nhatro.reduce((acc, tro) => {
      if (tro.id == selectedNhatro) {
        acc.push(tro.Thongtin);
      }
      return acc;
    }, []);
    return tro[0];
  };
  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Đóng");
      handleClose();
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
        Danh sách phòng (
        {user?.nhatro.length == 1 ? user?.nhatro[0].tenTro : ""})
      </div>
      <div className="flex justify-center text-[13px] mt-[-5px]">
        - Chọn một phòng để thêm người vào ở -
      </div>
      <div className="body-container">
        {user?.nhatro.length > 1 ? (
          <div className="filter-container">
            <select
              value={selectedNhatro}
              onChange={(e) => {
                setSelectedNhatro(e.target.value);
              }}
            >
              {user?.nhatro.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tenTro}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
        <div className="list_item_big">
          {filterPhongtro2(user?.nhatro).map((item) => (
            <div key={item.id} className="nhatro-item layout">
              <div className="tang_name">{item.tenTang}</div>
              <div className="list_phong">
                {item.Chitiet.map((phong) => (
                  <div
                    key={phong.id}
                    className={`items ${
                      phong.Nguoitro.length > 0 ? "online" : "offline"
                    }`}
                    onClick={() => {
                      handleEditTro(phong);
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
                        .replaceAll(" ", "") + " "}
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
      </div>
    </>
  );
};

export default Off_phong;
