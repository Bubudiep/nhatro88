import React, { useState, useEffect, useRef } from "react";
import api from "../../../../components/api";
import Update_phong from "./list_phongtro/update_phong";
import Payment_phong from "./list_phongtro/payment_phong";
import Details_phong from "./list_phongtro/details_phong";
import ChitietHoadon from "./list_phongtro/chitietHoadon";
import Add_nguoi from "./list_phongtro/add_nguoi";
import All_phong from "./list_phongtro/all_phong";
import Off_phong from "./list_phongtro/off_phong";

const ListPhongtro = ({ option, onClose, user, onUserUpdate }) => {
  const [Hoadon, setHoadon] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const [editNhatro, setEditNhatro] = useState(false);
  const [IsThanhtoan, setIsThanhtoan] = useState(false);
  const [IsCapnhap, setIsCapnhap] = useState(false);
  const [formUpdates, setformupdates] = useState({
    phong: null,
    giaphong: 0,
    sodien: 0,
    sonuoc: 0,
    dieuhoa: false,
    nonglanh: false,
    wifi: false,
  });
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  const handleEditTro = (phong) => {
    setSlideMain("slideOut");
    setTimeout(() => {
      setSlide2("slideIn");
      setEditNhatro(phong);
    }, 200);
  };

  const handleBack = () => {
    setSlide2("slideOut2");
    setTimeout(() => {
      setSlideMain("slideIn2");
      setEditNhatro(false);
    }, 200);
  };
  const handleBack2 = () => {
    setSlideMain("slideOut2");
    setTimeout(() => {
      setSlide2("slideIn2");
      setIsThanhtoan(false);
    }, 200);
  };
  const handleThanhtoan = () => {
    setSlide2("slideOut");
    setTimeout(() => {
      setSlideMain("slideIn");
      setIsThanhtoan(true);
    }, 200);
  };
  const handleCapnhap = () => {
    setformupdates((prevState) => ({
      ...prevState,
      phong: editNhatro.id,
      giaphong: editNhatro.giaPhong,
      sodien: editNhatro.sodien,
      sonuoc: editNhatro.sonuoc,
      dieuhoa: editNhatro.dieuhoa,
      nonglanh: editNhatro.nonglanh,
      wifi: editNhatro.wifi,
    }));
    setSlide2("slideOut");
    setTimeout(() => {
      setSlideMain("slideIn");
      setIsCapnhap(true);
    }, 200);
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
        {editNhatro ? (
          option == "off" ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
            >
              <Add_nguoi
                user={user}
                phong={editNhatro}
                handleBack={(e) => {
                  if (e) {
                    onUserUpdate(e);
                  }
                  setSlide2("slideOut2");
                  setTimeout(() => {
                    setSlideMain("slideIn2");
                    setEditNhatro(false);
                  }, 200);
                }}
              />
            </div>
          ) : IsCapnhap ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <Update_phong
                phong={editNhatro}
                token={user?.app?.access_token}
                handleUpdatesuccess={(e) => {
                  if (e && e?.tro && e?.phong) {
                    onUserUpdate(e.tro);
                    setEditNhatro(e.phong);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setIsCapnhap(false);
                  }, 200);
                }}
              />
            </div>
          ) : IsThanhtoan ? (
            <div
              className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <Payment_phong
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
                handleBack={(e) => {
                  if (e?.id) {
                    setEditNhatro(e);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setIsThanhtoan(false);
                  }, 200);
                }}
              />
            </div>
          ) : Hoadon ? (
            <div
              className={`slider overflow-hidden flex-1 message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
            >
              <ChitietHoadon
                hoadon={Hoadon}
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                handleBack={(e) => {
                  if (e?.id) {
                    setEditNhatro(e);
                  }
                  setSlideMain("slideOut2");
                  setTimeout(() => {
                    setSlide2("slideIn2");
                    setHoadon(null);
                  }, 200);
                }}
                token={user?.app?.access_token}
              />
            </div>
          ) : (
            <div
              className={`slider overflow-hidden flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
            >
              <Details_phong
                phong={editNhatro}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
                handleBack2={handleBack2}
                handleBack={handleBack}
                handleThanhtoan={handleThanhtoan}
                handleCapnhap={handleCapnhap}
                handleHoadon={(e) => {
                  setSlide2("slideOut");
                  setTimeout(() => {
                    setSlideMain("slideIn");
                    setHoadon(e);
                  }, 200);
                }}
              />
            </div>
          )
        ) : (
          <div
            className={`slider message-box fade-in-5 gap-2 flex flex-col ${slideMain}`}
          >
            {option == "off" ? (
              <Off_phong
                user={user}
                handleClose={handleClose}
                handleEditTro={handleEditTro}
              />
            ) : (
              <All_phong
                user={user}
                handleEditTro={handleEditTro}
                handleClose={handleClose}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPhongtro;
