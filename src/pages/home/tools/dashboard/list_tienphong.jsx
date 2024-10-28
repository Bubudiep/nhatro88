import React, { useRef, useState } from "react";

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
  // vuốt chạm

  const [startY, setStartY] = useState(null);
  const [bottomPos, setBottomPos] = useState(0); // Giá trị bottom
  const [velocity, setVelocity] = useState(0); // Tốc độ kéo
  const isTouchingRef = useRef(false); // Sử dụng useRef để theo dõi isTouching
  let animationFrame;

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    isTouchingRef.current = true; // Cập nhật giá trị tham chiếu
    cancelAnimationFrame(animationFrame); // Hủy bỏ bất kỳ animation nào đang chạy
  };

  const handleTouchMove = (e) => {
    if (startY !== null) {
      const touchY = e.touches[0].clientY;
      const diffY = startY - touchY; // Sự khác biệt giữa vị trí bắt đầu và hiện tại
      let newBottomPos = bottomPos + diffY; // Cập nhật vị trí bottom mới dựa trên sự kéo lên/xuống
      if (newBottomPos > 0) newBottomPos = 0; // Đảm bảo không vượt quá giới hạn
      setBottomPos(newBottomPos); // Cập nhật vị trí bottom
      setStartY(touchY); // Cập nhật startY để liên tục tính từ điểm hiện tại

      // Tính toán velocity (tốc độ) dựa trên sự thay đổi vị trí
      setVelocity(diffY);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
    isTouchingRef.current = false; // Cập nhật giá trị tham chiếu
    const stopScroll = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame); // Dừng animation nếu cần
      }
    };
    const continueScroll = () => {
      if (!isTouchingRef.current && Math.abs(velocity) > 0.1) {
        setVelocity((prevVelocity) => {
          const newVelocity = prevVelocity * 0.95; // Giảm tốc
          setBottomPos((prevBottomPos) => {
            let newBottomPos = prevBottomPos + newVelocity;
            if (newBottomPos > 0) newBottomPos = 0; // Không vượt quá vị trí giới hạn
            if (Math.abs(newVelocity) <= 0.1) {
              stopScroll(); // Dừng animation nếu tốc độ quá nhỏ
            }
            const bottomBox = document.querySelector(".bottom-box-white");
            const bottomBoxHeight = bottomBox?.offsetHeight || 0;
            const computedStyle = window.getComputedStyle(bottomBox);
            const bottomCssValue = parseFloat(computedStyle.bottom) || 0;

            // Kiểm tra chiều cao của bottom-box-white
            const increment = 4; // Bước tăng dần
            if (bottomBoxHeight - bottomCssValue * -1 <= 200) {
              handleClose();
            } else if (bottomCssValue > -150) {
              newBottomPos = Math.min(newBottomPos + increment, 0); // Cập nhật newBottomPos, đảm bảo không vượt quá 0
            } else {
              newBottomPos = Math.max(newBottomPos - increment, -1000);
            }
            return newBottomPos;
          });
          return newVelocity;
        });
        animationFrame = requestAnimationFrame(continueScroll);
      }
    };

    // Bắt đầu hiệu ứng trôi sau khi thả tay
    animationFrame = requestAnimationFrame(continueScroll);
  };
  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div
        className="detectOut"
        onClick={handleClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div
        className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}
        style={{ bottom: `${bottomPos}px` }}
      >
        <div
          className="top-bar"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
