import React, { Suspense, useEffect } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import Logo from "../img/logo.png";
import Background_ct from "../img/bg_city.jpg";
import api from "../components/api";
import { getUserInfo } from "zmp-sdk/apis";

const HomePage = () => {
  const navigate = useNavigate();
  const pageStyle = {
    backgroundImage: `url(${Background_ct})`,
  };
  useEffect(() => {
    getUserInfo({
      success: (data) => {
        console.log(data);
        api
          .post("/zlogin/", {
            zalo_id: data.userInfo.id,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);
  const handleStart = () => {
    navigate("/home", { animate: true, direction: "forward" });
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
        <button className="start-btn" onClick={handleStart}>
          Bắt đầu
        </button>
      </div>
      <div className="hint">Phiên bản 1.1.58-2482. Zalo-mini-app</div>
    </div>
  );
};

export default HomePage;
