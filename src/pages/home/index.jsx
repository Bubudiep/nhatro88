// Home.js
import React, { useState, useEffect } from "react";
import logo from "../../img/logo.png";
import banner_1 from "../../img/banner/banner_2.png";
import api from "../../components/api";
import Nhatromoi from "./trangchu/nhatromoi";
import Nhatro from "./trangchu/Nhatro";

const Home = ({ user }) => {
  const [nhatro, setNhatro] = useState(user?.nhatro || null); // Quản lý trạng thái nhà trọ
  // Hàm để cập nhật lại nhà trọ khi có thay đổi
  const updateNhatro = () => {
    api
      .get("/nhatro/", user?.app?.access_token)
      .then((response) => {
        console.log(response);
        const nhatroData = response.results ?? null;
        user.nhatro = nhatroData;
        setNhatro(nhatroData); // Cập nhật state với dữ liệu mới
        console.log("Nhà trọ đã được cập nhật:", nhatroData);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin nhà trọ:", error);
      });
  };

  useEffect(() => {
    updateNhatro(); // Lấy thông tin nhà trọ khi component được render
  }, [user]);

  return (
    <div className="main-view">
      <div className="sliders">
        <img src={banner_1} alt="Banner" />
      </div>
      <div className="main-container">
        {nhatro ? (
          <Nhatro user={user} />
        ) : (
          <Nhatromoi user={user} updateNhatro={updateNhatro} /> // Truyền callback vào Nhatromoi
        )}
      </div>
    </div>
  );
};

export default Home;
