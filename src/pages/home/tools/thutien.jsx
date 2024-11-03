import React, { useEffect, useRef, useState } from "react";
import Thutiennhanh from "./thutien/thutiennhanh";
import Thutien_chitiet from "./thutien/thutien_chitiet";
import Dathanhtoan from "./thutien/dathanhtoan";
import Chuathanhtoan from "./thutien/chuathanhtoan";
import Thutien from "./thutien/thutien";

const ThuTienComponent = ({ onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isChitiet, setIsChitiet] = useState(false);
  const [isThutien, setIsThutien] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };
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
  const handleThutien = (e) => {
    setIsThutien(e);
  };
  const handleDetails = (e) => {
    setIsChitiet(e);
  };
  const phong = user.nhatro
    .flatMap((nhatro) => nhatro.Thongtin)
    .flatMap((tt) => tt.Chitiet);
  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div
        className="detectOut"
        onClick={handleClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      {isThutien && (
        <Thutien
          phong={isThutien}
          onUserUpdate={onUserUpdate}
          token={user?.app?.access_token}
          handleClose={() => {
            setIsThutien(false);
          }}
        />
      )}
      {isChitiet && (
        <Thutien_chitiet
          phong={isChitiet}
          onUserUpdate={onUserUpdate}
          token={user?.app?.access_token}
          handleClose={() => {
            setIsChitiet(false);
          }}
        />
      )}
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
        <div className="slider fade-in-5">
          <div className="title2">
            Thu tiền định kỳ ({user?.nhatro[0].ngay_thu_tien ?? 15} hàng tháng)
          </div>
          <div className="body-container">
            {phong.length == 0 ? (
              <>
                <div className="null">
                  <div className="icon">
                    <i className="fa-regular fa-face-laugh-beam"></i>
                  </div>
                  <div className="value">Không có phòng nào!</div>
                </div>
              </>
            ) : (
              <>
                <div className="list_item_big">
                  {phong.map((phong) => (
                    <div className="nhatro-item" key={phong.id}>
                      <div className="details active">
                        {phong.Nguoitro.length > 0 ? (
                          <>
                            {phong?.hoadon.length > 0 &&
                            new Date(phong?.hoadon[0].ngayKetthuc).getMonth() ==
                              new Date().getMonth() ? ( // đã có hóa đơn trong tháng này
                              phong?.hoadon[0].isPaid ? (
                                <Dathanhtoan phong={phong} />
                              ) : (
                                <Chuathanhtoan
                                  phong={phong}
                                  nhatro={user.nhatro[0]}
                                  handleThutien={handleThutien}
                                />
                              )
                            ) : (
                              <Thutiennhanh
                                phong={phong}
                                nhatro={user.nhatro[0]}
                                handleDetails={handleDetails}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <div className="i-info">
                              <div className="name text-[#555] text-[14px]">
                                {phong.soPhong} -{phong.tenTang}
                              </div>
                              <div className="value giaphong"></div>
                            </div>
                            <div className="flex text-[#aaa]">Trống</div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThuTienComponent;
