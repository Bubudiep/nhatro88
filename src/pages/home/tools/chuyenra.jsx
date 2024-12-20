import React, { useEffect, useRef, useState } from "react";

const ChuyenRaComponent = ({ onClose, onUserUpdate, user }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [nhatro, setnhatro] = useState(user.nhatro[0]);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };
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

  const filterNguoitro = (nhatro) => {
    return user.nhatro.reduce((acc, tro) => {
      tro.Thongtin.forEach((tang) => {
        tang.Chitiet.forEach((phong) => {
          acc.push(...phong.Nguoitro);
        });
      });
      return acc;
    }, []);
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
        <div className="slider fade-in-5">
          <div className="title2">Chuyển ra và thanh toán</div>
          <div className="body-container">
            {/* <div className="h3">
              <div className="name">Danh sách xin ra</div>
            </div>
            <div className="list-group">
              <div className="null">
                <div className="logo"></div>
                <div className="message">Danh sách trống</div>
              </div>
            </div> */}
            <div className="h3">Danh sách người ở</div>
            {filterNguoitro(user?.nhatro).length > 0 ? (
              <div className="list_item_big">
                {filterNguoitro(user?.nhatro).map((item) => (
                  <div
                    key={item.id}
                    className="nhatro-item"
                    onClick={() => handleNguoitro(item)}
                  >
                    <div
                      className={`details ${item.isOnline ? "active" : "stop"}`}
                    >
                      <div className="i-info">
                        <div className="name i-title">
                          {item?.ThongtinNguoiTro?.hoTen}
                        </div>
                        <div className="value giaphong">
                          {new Date().getFullYear() -
                            new Date(
                              item?.ThongtinNguoiTro?.ngaysinh
                            ).getFullYear()}{" "}
                          tuổi
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name text-[13px]">
                          <i className="fa-solid fa-house-user"></i>
                          {item.SoPhong} - {item.SoTang}
                        </div>
                        <div className="value text-[13px]">
                          {Math.floor(
                            (new Date() - new Date(item.ngayBatdauO)) /
                              (24 * 3600 * 1000)
                          ) + 1}{" "}
                          ngày
                        </div>
                      </div>
                      <div className="i-info">
                        <div className="name text-[13px]">
                          <i className="fa-solid fa-mobile-screen"></i>
                          Liên hệ
                        </div>
                        <div className="flex gap-2 items-center value text-[13px] text-[#8f9fb4]">
                          {item.ThongtinNguoiTro.sdt}
                        </div>
                      </div>
                      <div className="i-details mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="list-group">
                <div className="null">
                  <div className="logo">
                    <i className="fa-solid fa-users-viewfinder"></i>
                  </div>
                  <div className="message">Danh sách trống</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChuyenRaComponent;
