import React, { useEffect, useState } from "react";
import { useNavigate } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";
import api from "../components/api";
import logo from "../img/logo.png";

const PrivateRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Để theo dõi trạng thái loading
  const [user, setUser] = useState(null);
  const [showLoading, setShowLoading] = useState(true); // Trạng thái cho việc ẩn loading

  useEffect(() => {
    getUserInfo({
      success: (data) => {
        api
          .post("/zlogin/", {
            zalo_id: data.userInfo.id,
          })
          .then((response) => {
            const userData = {
              zalo: data,
              app: response.data,
            };
            setUser(userData); // Lưu user vào state
            setLoading(false); // Kết thúc trạng thái loading

            // Thêm thời gian ngắn để animation hoàn thành
            setTimeout(() => {
              setShowLoading(false);
            }, 500); // Đợi 0.5 giây để fade out
          })
          .catch((error) => {
            navigate("/start", {
              replace: true,
              animate: false,
              direction: "forward",
            });
            console.error("Error fetching data:", error);
          });
      },
      fail: (error) => {
        console.log(error);
        navigate("/start", {
          replace: true,
          animate: false,
          direction: "forward",
        });
      },
    });
  }, [navigate]);

  return (
    <>
      {/* Loading screen */}
      <div className={`loading-screen ${!showLoading && "hide"}`}>
        <div className="loading-box active">
          <div className="loading-start">
            <div className="user-card loading">
              <div className="user-info">
                <div className="avatar">
                  <img src={logo} alt="logo" />
                </div>
                <div className="msg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component hiển thị khi đã tải xong */}
      {!loading && <Component user={user} />}
    </>
  );
};

export default PrivateRoute;
