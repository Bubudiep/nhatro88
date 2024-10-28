import React, { useRef, useState } from "react";
import api from "../../../../components/api";
import house_mini from "../../../../img/house_mini.png";
import Add_nhatro from "./list_nhatro/add_nhatro";
import Edit_nhatro from "./list_nhatro/edit_nhatro";
import List_nhatro from "./list_nhatro/list_nhatro";
import View_nhatro from "./list_nhatro/view_nhatro";
import Chitiet_phong from "./list_nhatro/chitiet_phong";
const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  const [isThemtro, setIsThemTro] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isChitietPhong, setIsChitietPhong] = useState(false);
  const [slideDanhsach, setSlideDanhsach] = useState("");
  const [slideNhatro, setSlideNhatro] = useState("");
  const [themtroError, setThemtroError] = useState("");

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
    setNhatro_id(e);
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
    }, 200);
  };
  const handleViewnhatro = (e) => {
    const updateData = user.nhatro.find((nhatro) => nhatro.id === e);
    setSlideDanhsach("slideOut");
    setTimeout(() => {
      setSlideNhatro("slideIn");
      setIsUpdate(updateData);
      setIsEdit(false);
    }, 200);
  };

  const handleBack = () => {
    setSlideNhatro("slideOut2");
    setTimeout(() => {
      setSlideDanhsach("slideIn2");
      setIsUpdate(null);
      setIsThemTro(false);
    }, 200);
  };
  const handleBack2 = (e) => {
    setSlideDanhsach("slideOut2");
    setTimeout(() => {
      setSlideNhatro("slideIn2");
      setIsEdit(false);
    }, 200);
  };
  const handleEdittro = () => {
    setSlideNhatro("slideOut");
    setTimeout(() => {
      setSlideDanhsach("slideIn");
      setIsEdit(true);
    }, 200);
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
        {isThemtro ? ( // Step 2: Form điền chi tiết nhà trọ
          <div
            className={`slider p-[20px] message-box fade-in-5 gap-2 flex flex-col ${slideNhatro}`}
          >
            <Add_nhatro
              handleBack={handleBack}
              onUserUpdate={onUserUpdate}
              token={user?.app?.access_token}
            />
          </div>
        ) : isUpdate ? (
          isEdit ? (
            <div className={`slider fade-in-5 ${slideDanhsach}`}>
              <Edit_nhatro
                nhatro={isUpdate}
                handleBack={(e) => {
                  console.log(e);
                  if (e?.id) {
                    setIsUpdate((prev) => ({
                      ...prev,
                      ...e,
                    }));
                  }
                  setSlideDanhsach("slideOut2");
                  setTimeout(() => {
                    setSlideNhatro("slideIn2");
                    setIsEdit(false);
                  }, 200);
                }}
                onUserUpdate={onUserUpdate}
                token={user?.app?.access_token}
              />
            </div>
          ) : isChitietPhong ? (
            <div className={`slider fade-in-5 ${slideDanhsach}`}>
              <Chitiet_phong
                phong={isChitietPhong}
                token={user?.app?.access_token}
                onUserUpdate={onUserUpdate}
                handleBack={(e) => {
                  setSlideDanhsach("slideOut2");
                  setTimeout(() => {
                    if (e?.QRKey) setIsUpdate(e);
                    setSlideNhatro("slideIn2");
                    setIsChitietPhong(false);
                  }, 200);
                }}
              />
            </div>
          ) : (
            <div className={`slider fade-in-5 ${slideNhatro}`}>
              <View_nhatro
                nhatro={isUpdate}
                token={user?.app?.access_token}
                handleBack={() => {
                  setSlideNhatro("slideOut2");
                  setTimeout(() => {
                    setSlideDanhsach("slideIn2");
                    setIsUpdate(null);
                    setIsThemTro(false);
                  }, 200);
                }}
                handleEdittro={handleEdittro}
                handlePhongtro={(e) => {
                  setSlideNhatro("slideOut");
                  setTimeout(() => {
                    setSlideDanhsach("slideIn");
                    setIsChitietPhong(e);
                  }, 200);
                }}
              />
            </div>
          )
        ) : (
          <div className={`slider fade-in-5 ${slideDanhsach}`}>
            <List_nhatro
              onClose={handleClose}
              user={user}
              handleThemnhatro={handleThemnhatro}
              handleViewnhatro={handleViewnhatro}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNhatro;
