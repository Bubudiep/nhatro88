import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "../components/user-card";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import Background from "../img/bg.png";
import Background_city from "../img/bg_city.png";
import Background_ct from "../img/bg_city.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const pageStyle = {
    backgroundImage: `url(${Background_ct})`,
  };
  return (
    <div className="start-page" style={pageStyle}>
      <div className="logo">
        <img src={Logo} />
        <div className="name">Nhà trọ 88</div>
      </div>
      <div className="sologan">Tìm, quản lý nhà trọ dễ dàng, thông minh!</div>
      <div className="box-details">
        <ul>
          <li>Tìm phòng trọ phù hợp xung quanh bạn.</li>
          <li>
            Thống kê chi tiết ngày bắt đầu thuê trọ, lịch thanh toán, lập kế
            hoạch, tính toán chi phí.
          </li>
          <li>
            Lưu trữ hóa đơn thanh toán hàng tháng kể cả khi bạn chuyển qua phòng
            khác
          </li>
          <li>Nhắc nhở thông minh khi đến kỳ hạn đóng tiền phòng.</li>
        </ul>
      </div>
      <div className="flex mt-3">
        <button className="start-btn">Bắt đầu</button>
      </div>
      <div className="hint">Phiên bản 1.1.58-2482. Zalo-mini-app</div>
    </div>
  );
};

export default HomePage;
