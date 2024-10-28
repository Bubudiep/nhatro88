import React, { useEffect } from "react";

const Phong_no = ({ user, handleClose }) => {
  const phong = user.nhatro
    .flatMap((nhatro) => nhatro.Thongtin)
    .flatMap((tt) => tt.Chitiet);
  const phongunPaid = phong.filter((phong) =>
    phong.hoadon.some((hd) => !hd.isPaid)
  );
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
      <div className="title2">Danh sách nợ</div>
      <div className="chitiet-phongtro body-container">
        {phongunPaid.length == 0 ? (
          <>
            <div className="null">
              <div className="icon">
                <i className="fa-regular fa-face-laugh-beam"></i>
              </div>
              <div className="value">Không có phòng nào nợ!</div>
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
                            ?.reduce((sum, hoadon) => sum + hoadon.tongTien, 0)
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
        )}
      </div>
    </>
  );
};

export default Phong_no;
