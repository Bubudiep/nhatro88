import React, { useState } from "react";

const ListTienphong = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  window.addEventListener("popstate", (event) => {
    handleClose();
  });
  const phong = user.nhatro
    .flatMap((nhatro) => nhatro.Thongtin)
    .flatMap((tt) => tt.Chitiet);
  const phongunPaid = phong.filter((phong) =>
    phong.hoadon.some((hd) => !hd.isPaid)
  );
  const phongPaid = phong.filter((phong) =>
    phong.hoadon.some((hd) => hd.isPaid)
  );
  console.log(phongunPaid, phongPaid);
  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div
          className={`slider flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
        >
          <div className="title2">
            {option == "no" ? "Danh sách nợ" : "Doanh thu tạm tính"}
          </div>
          <div className="chitiet-phongtro body-container">
            {option == "no" ? (
              phongunPaid.length == 0 ? (
                <>
                  <div className="null">
                    <div className="icon"></div>
                    <div className="value">Danh sách trống!</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="list_item_big">
                    {phongunPaid.map((phong) => (
                      <div className="nhatro-item" key={phong.id}>
                        <div className="details active">
                          <div className="i-info">
                            <div className="name i-title">
                              {phong.soPhong} -{phong.tenTang}
                            </div>
                            <div className="value giaphong">
                              Nợ{" "}
                              {parseInt(
                                (
                                  phong?.hoadon?.reduce(
                                    (sum, hoadon) => sum + hoadon.tongTien,
                                    0
                                  ) -
                                  phong?.hoadon?.reduce((sumHoadon, hoadon) => {
                                    const sumChitiet = hoadon.Chitiet?.reduce(
                                      (sumChitiet, chitiet) =>
                                        sumChitiet + chitiet.so_tien,
                                      0
                                    );
                                    return sumHoadon + sumChitiet;
                                  }, 0)
                                ).toFixed(0)
                              ).toLocaleString("vi-vn")}{" "}
                              đ
                            </div>
                          </div>
                          <div className="i-info">
                            <div className="name">Cần thanh toán</div>
                            <div className="value">
                              {parseInt(
                                phong?.hoadon
                                  ?.reduce(
                                    (sum, hoadon) => sum + hoadon.tongTien,
                                    0
                                  )
                                  .toFixed(0)
                              ).toLocaleString("vi-vn")}{" "}
                              đ
                            </div>
                          </div>
                          <div className="i-info">
                            <div className="name">Đã trả</div>
                            <div className="value">
                              {phong?.hoadon
                                ?.reduce((sumHoadon, hoadon) => {
                                  const sumChitiet = hoadon.Chitiet?.reduce(
                                    (sumChitiet, chitiet) =>
                                      sumChitiet + chitiet.so_tien,
                                    0
                                  );
                                  return sumHoadon + sumChitiet;
                                }, 0)
                                .toLocaleString("vi-vn")}{" "}
                              đ
                            </div>
                          </div>
                        </div>
                        <div className="view">
                          <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTienphong;
