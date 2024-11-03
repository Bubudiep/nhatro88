import React, { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import logo from "../../../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { saveImageToGallery } from "zmp-sdk/apis";
import html2canvas from "html2canvas";

const QR_tro = ({ onClose, user }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setsaved] = useState(false);
  const [nhatro, setnhatro] = useState(user?.nhatro[0]);
  const [isClosing, setIsClosing] = useState(false);
  const [logo_show, setlogo_show] = useState(true);
  const [fgColor, setFgColor] = useState("#004fa3"); // Default to black
  const [eyeColor, setEyeColor] = useState("#0e3177"); // Default color for QR code eyes
  const qrRef = useRef(null);
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
  const navigate = useNavigate();
  const [link, setlink] = useState(
    `https://zalo.me/s/` +
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 2
      ] +
      "/nhatro" +
      window.location.search +
      "&KEY=" +
      nhatro?.QRKey
  );
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
  const handleLink = () => {
    navigate("/nhatro?KEY=" + user?.nhatro[0].QRKey);
  };
  const saveImage = async () => {
    const canvas = await html2canvas(qrRef.current);
    const image = canvas.toDataURL("image/png");
    try {
      await saveImageToGallery({
        imageBase64Data: image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    const canvas = await html2canvas(qrRef.current);
    const image = canvas.toDataURL("image/png");
    try {
      await saveImageToGallery({
        imageBase64Data: image,
      }).then(() => {
        setsaved(true); // Cập nhật trạng thái để hiển thị thông báo
        setTimeout(() => setsaved(false), 2000); // Ẩn thông báo sau 2 giây
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link) // Sao chép nội dung vào clipboard
      .then(() => {
        setCopied(true); // Cập nhật trạng thái để hiển thị thông báo
        setTimeout(() => setCopied(false), 2000); // Ẩn thông báo sau 2 giây
      })
      .catch((err) => console.error("Failed to copy:", err));
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
        <div className="slider fade-in-5">
          <div className="body-container">
            <div className="QRcode_config">
              <div className="QRCode_preview" ref={qrRef}>
                <div className="title2">QR nhà trọ</div>
                <div className="QRcode">
                  <QRCode
                    value={link} // Data to encode
                    size={150} // Size of the QR code
                    logoImage={logo_show && logo} // URL of the logo image
                    logoWidth={30} // Width of the logo
                    logoHeight={30} // Height of the logo
                    logoOpacity={0.8} // Adjust logo opacity
                    qrStyle="dots" // Set dot style
                    eyeRadius={10} // Set roundness of the "eye" (corner squares)
                    fgColor={fgColor} // Foreground color
                    bgColor="#ffffff" // Background color
                    ecLevel="M" // Error correction level
                    eyeColor={eyeColor} // Color for the eyes of the QR code
                    removeQrCodeBehindLogo={true}
                    logoPadding={3} // Simulates padding around the logo
                  />
                  <div className="guide">
                    <div className="step">1. Mở Zalo chọn quét mã QR</div>
                    <div className="step">2. Quét mã QR code phía trên</div>
                  </div>
                </div>
              </div>
              <div className="save-img" onClick={handleSave}>
                {saved ? (
                  <div className="value on">Đã lưu ảnh</div>
                ) : (
                  <div className="value">Lưu ảnh</div>
                )}
              </div>
              <div className="link" onClick={handleCopy}>
                <div className="value">{link}</div>
              </div>
              <div className="flex justify-center text-[#2d61d3] text-[13px] font-[500]  pt-2">
                {copied ? (
                  <div className="openlink" onClick={handleLink}>
                    Đã coppy
                  </div>
                ) : (
                  <div className="openlink" onClick={handleLink}>
                    <i className="fa-solid fa-link"></i> Mở link
                  </div>
                )}
              </div>
              <div className="config">
                <div className="items">
                  <div className="name">Hiển thị logo nhà trọ</div>
                  <div className="value checkbox">
                    <label className={`container ${logo_show && "active"}`}>
                      <input
                        type="checkbox"
                        checked={logo_show}
                        onChange={(e) => {
                          setlogo_show(e.target.checked);
                        }}
                      />
                      <svg
                        viewBox="0 0 512 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="check-regular"
                      >
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 512 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="check-solid"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="items">
                  <div className="name">Chọ màu cho chấm nhỏ</div>
                  <div className="value">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      style={{ marginLeft: "10px", marginBottom: "10px" }}
                    />
                  </div>
                </div>
                <div className="items">
                  <div className="name">Chọn màu cho chấm lớn</div>
                  <div className="value">
                    <input
                      type="color"
                      value={eyeColor}
                      onChange={(e) => setEyeColor(e.target.value)}
                      style={{ marginLeft: "10px", marginBottom: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QR_tro;
