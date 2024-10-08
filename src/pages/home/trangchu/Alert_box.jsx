import React from "react";
import { Link } from "react-router-dom";

const Alert_box = () => {
  return (
    <div className="alert-box">
      <div className="nguoi-moi">
        <div className="logo">
          <i className="fa-solid fa-bell fa-shake"></i>
        </div>
        <div className="message">
          <div className="title">Thần tài đến!!</div>
          <div className="value">Bạn có +1 người xin vào ở trọ của bạn!</div>
        </div>
      </div>
      <div className="nguoi-moi dongtien">
        <div className="logo">
          <i className="fa-brands fa-envira fa-shake"></i>
        </div>
        <div className="message">
          <div className="title">Lúa về +1.536.000!!</div>
          <div className="value">
            <Link to="#">Hải</Link> tại <Link to="#">Phòng 03</Link> đã thanh
            toán tiền phòng trọ tháng 9!
          </div>
        </div>
      </div>
      <div className="nguoi-moi out">
        <div className="logo">
          <i className="fa-brands fa-flickr"></i>
        </div>
        <div className="message">
          <div className="title">Chuyển ra</div>
          <div className="value">
            <Link to="#">Hải</Link> tại <Link to="#">Phòng 03</Link> đang yêu
            cầu chuyển ra
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert_box;
