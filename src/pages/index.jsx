import React, { Suspense, useEffect, useContext, useState } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import Logo from "../img/logo.png";
import Background_ct from "../img/bg_city.jpg";
import api from "../components/api";
import app from "../components/all";
import { authorize, getUserInfo } from "zmp-sdk/apis";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMassage] = useState(null);
  const { user, setUser } = useContext(UserContext); // Lấy context
  const [isAccept, setIsaccept] = useState(true);
  const navigate = useNavigate();
  const pageStyle = {
    backgroundImage: `url(${Background_ct})`,
  };
  console.log("Start");
  const handleStart = () => {
    setLoading(true);
    authorize({
      scopes: ["scope.userInfo", "scope.userPhonenumber"],
      success: (data) => {
        getUserInfo({
          success: (data) => {
            api
              .post("/zlogin/", {
                zalo_id: data.userInfo.id,
              })
              .then((response) => {
                setUser({
                  zalo: data.userInfo,
                  app: response, // Cập nhật user.app
                });
                navigate("/", {
                  replace: true,
                  animate: true,
                  direction: "forward",
                });
                setLoading(false);
              })
              .catch((error) => {
                api
                  .post("/register/", {
                    zalo_id: data.userInfo.id,
                    username: data.userInfo.id,
                    password: app.random(10),
                    zalo_name: data.userInfo.name,
                    email: data.userInfo.id + "@gmail.com",
                  })
                  .then((response) => {
                    console.log(response);
                    setUser({
                      zalo: data.userInfo,
                      app: response, // Cập nhật user.app
                    });
                    navigate("/", {
                      replace: true,
                      animate: true,
                      direction: "forward",
                    });
                  })
                  .catch((error) => {
                    setLoading(false);
                    setMassage("Lỗi kết nối máy chủ! Vui lòng thử lại sau!");
                    console.error("Error fetching data:", error);
                  });
              });
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
        setLoading(false);
        setMassage("Chưa có dữ liệu cấp quyền Zalo!");
      },
    });
  };
  return (
    <div className="start-page h-[101vh]" style={pageStyle}>
      <div className="logo">
        <img src={Logo} />
        <div className="name">Nhà trọ 88</div>
      </div>
      <div className="sologan">Quản lý nhà trọ dễ dàng, thông minh!</div>
      <div className="box-details pt-4">
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
      <div className="hint-login">
        <div className="mes">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isAccept}
              onChange={(e) => {
                setIsaccept(e.target.checked);
              }}
            />
          </div>
          Cung cấp số điện thoại và tên Zalo của bạn để đăng nhập!
        </div>
      </div>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        message && <div className="error-message">{message}</div>
      )}
      <div className="flex mt-3">
        <button
          className="start-btn"
          disabled={!isAccept}
          onClick={() => {
            handleStart();
          }}
        >
          Đăng nhập
        </button>
      </div>
      <div className="hint">Phiên bản 1.1.58-2482. Zalo-mini-app</div>
    </div>
  );
};

export default HomePage;
