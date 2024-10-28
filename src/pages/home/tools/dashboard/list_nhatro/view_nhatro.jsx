import React, { useEffect } from "react";

const View_nhatro = ({ nhatro, handleEdittro, handlePhongtro, handleBack }) => {
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
      <div className="text-[12px] text-center">Chọn một phòng để cài đặt</div>
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
                      phong.Nguoitro.length > 0 ? "online" : "offline"
                    }`}
                    onClick={() => {
                      handlePhongtro(phong);
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
