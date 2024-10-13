import React, { useState, useEffect, useContext } from "react";
import logo from "../../img/logo.png";
import banner_1 from "../../img/banner/banner_2.png";
import api from "../../components/api";
import Nhatromoi from "./trangchu/nhatromoi";
import Nhatro from "./trangchu/Nhatro";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext); // Lấy context
  const [nhatro, setNhatro] = useState([]); // Quản lý trạng thái nhà trọ
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const navigate = useNavigate();
  const updateNhatro = () => {
    setLoading(true); // Bắt đầu loading
    api
      .get("/my_nhatro/", user.app.access_token)
      .then((response) => {
        const nhatroData = response.results ?? [];
        user.nhatro = nhatroData;
        setNhatro(nhatroData); // Cập nhật state với dữ liệu mới
        console.log("Nhà trọ đã được cập nhật:", nhatroData);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin nhà trọ:", error);
        navigate("/start");
      })
      .finally(() => {
        // Đợi 1 giây trước khi kết thúc loading
        setLoading(false); // Kết thúc loading
      });
  };

  useEffect(() => {
    if (user == null) {
      navigate("/start");
    } else {
      updateNhatro(); // Lấy thông tin nhà trọ khi component được render
    }
  }, [user]);

  return (
    <div className={`main-view ${nhatro.length == 0 ? "start" : ""}`}>
      <div className="sliders">
        <img src={banner_1} alt="Banner" />
      </div>
      <div className="main-container">
        {loading ? ( // Kiểm tra trạng thái loading
          <div className="first-loading">
            <div className="loading-spinner"></div> {/* Thay thành spinner */}
          </div> // Hiển thị loading
        ) : nhatro.length > 0 ? (
          <Nhatro user={user} />
        ) : (
          <Nhatromoi user={user} updateNhatro={updateNhatro} /> // Truyền callback vào Nhatromoi
        )}
      </div>
    </div>
  );
};

export default Home;
