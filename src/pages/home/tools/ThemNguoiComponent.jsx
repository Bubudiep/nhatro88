import React, { useRef, useState } from "react";
import api from "zmp-sdk";

const ThemNguoiComponent = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const videoRef = useRef < HTMLVideoElement > null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };
  const handleScanQR = () => {
    api.requestCameraPermission({
      success: ({ userAllow, message }) => {
        if (userAllow) {
          api.scanQRCode({
            success: (data) => {
              const { content } = data;
              if (content) {
                console.log(content);
              } else {
              }
            },
          });
        }
      },
    });
  };
  return (
    <div className={`bottom-box-white-bg  ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white  ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="title">Thêm người vào ở</div>
        <div className="body-container">
          {/* <div className="list-hint">
            <div className="items">
              <div className="name">Phòng 1</div>
              <div className="detail">Tầng 1</div>
              <div className="status">Đang trống</div>
              <div className="tools">
                <button>Chọn</button>
              </div>
            </div>
            <div className="items">
              <div className="name">Phòng 2</div>
              <div className="detail">Tầng 1</div>
              <div className="status">Đang trống</div>
              <div className="tools">
                <button>Chọn</button>
              </div>
            </div>
            <div className="items">
              <div className="name">Phòng 3</div>
              <div className="detail">Tầng 1</div>
              <div className="status">Đang trống</div>
              <div className="tools">
                <button>Chọn</button>
              </div>
            </div>
          </div> */}
          <div className="h3">
            <div className="name">Thông tin người vào ở</div>
            <div className="actions">
              <button onClick={handleScanQR}>
                <i className="fa-solid fa-qrcode"></i>
              </button>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Họ tên</td>
                <td>
                  <input type="text" placeholder="họ và tên..." />
                </td>
              </tr>
              <tr>
                <td>CCCD</td>
                <td>
                  <input type="text" placeholder="số căn cước..." />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="h3">Thông tin phòng</div>
          <table>
            <tbody>
              <tr>
                <td>Tầng</td>
                <td>
                  <select>
                    <option>Chọn một tầng</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Phòng</td>
                <td>
                  <select>
                    <option>Chọn một phòng</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Ngày bắt đầu vào ở</td>
                <td>
                  <input type="date" />
                </td>
              </tr>
              <tr>
                <td>Tiền cọc</td>
                <td>
                  <div className="flex relative justify-end items-center">
                    <input type="number" defaultValue={1000000} />
                    <div className="unit">VNĐ</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="start-btn">
            <button>Thêm vào trọ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemNguoiComponent;
