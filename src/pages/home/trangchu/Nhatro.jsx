import React, { useEffect, useState } from "react";
import wallpp from "../../../img/nhatro/1370.jpg";
import Alert_box from "./Alert_box";
import Db_box from "./Db_box";
import ThemNguoiComponent from "../tools/themnguoi";
import ChuyenRaComponent from "../tools/chuyenra";
import ThuTienComponent from "../tools/thutien";
import NoiQuyComponent from "../tools/noiquy";
import TamTruComponent from "../tools/tamtru";
import CaiDatComponent from "../tools/caidat";
import PChitiet from "../tools/popup/P_chitiet";
import ListNhatro from "../tools/dashboard/list_nhatro";
import ListPhongtro from "../tools/dashboard/list_phongtro";
import ListTienphong from "../tools/dashboard/list_tienphong";
import ListNguoitro from "../tools/dashboard/list_nguoitro";
import Thongbao from "../tools/thongbao";
import Lienhe from "../tools/lienhe";
import { io } from "socket.io-client";
const SOCKET_SERVER_URL = "http://ipays.vn:3000"; // Thay đổi URL nếu cần
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // Thay đổi thời gian sống của cookie
  const expires = "expires=" + d.toUTCString(); // Thiết lập ngày hết hạn
  document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Cài đặt cookie
}
const Nhatro = ({ user }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [alertData, setAlertData] = useState(null); // Trạng thái để lưu thông tin alert
  const [alerts, setAlerts] = useState([
    // Khởi tạo alerts trong trạng thái
    {
      id: 1,
      iconClass: "fa-solid fa-bell fa-shake",
      title: "Thần tài đến!!",
      type: "normal",
      readed: false,
      valueLinks: [
        { text: "Bạn có +1 người xin vào ở trọ của bạn!", link: null },
      ],
    },
    {
      id: 2,
      iconClass: "fa-brands fa-envira fa-shake",
      title: "Lúa về +1.536.000!!",
      type: "dongtien",
      readed: false,
      valueLinks: [
        { text: "Hải", link: "#" },
        { text: "Phòng 03", link: "#" },
        { text: "đã thanh toán tiền phòng trọ tháng 9!", link: null },
      ],
    },
    {
      id: 3,
      iconClass: "fa-brands fa-flickr",
      title: "Chuyển ra",
      type: "out",
      readed: false,
      valueLinks: [
        { text: "Hải", link: "#" },
        { text: "Phòng 03", link: "#" },
        { text: "đang yêu cầu chuyển ra", link: null },
      ],
    },
  ]);
  const nhatro_style = {
    backgroundImage: `url(${wallpp})`,
  };
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleAlertSelect = (alert) => {
    setAlertData(alert); // Lưu thông tin alert vào trạng thái
    setSelectedComponent("popup");
  };
  const handleDashboard = (items) => {
    const items_dxt = items.split("_");
    setSelectedComponent(items_dxt[0]);
    setSelectedOption(items_dxt[1] ?? null);
  };

  const markAlertAsRead = (id) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, readed: true } : alert
      )
    );
  };
  const handleUserUpdate = (updatedUser) => {
    console.log(updatedUser);
    user.nhatro = updatedUser;
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case "popup":
        return (
          <PChitiet
            alert={alertData}
            onClose={(readed_items) => {
              if (readed_items?.id) {
                markAlertAsRead(readed_items.id); // Đánh dấu thông báo là đã đọc
              }
              setSelectedComponent(null);
            }}
          />
        );
      case "nguoitro":
        return (
          <ListNguoitro
            option={selectedOption}
            user={user}
            onUserUpdate={handleUserUpdate}
            onClose={() => setSelectedComponent(null)}
          />
        );
      case "nhatro":
        return (
          <ListNhatro
            option={selectedOption}
            user={user}
            onUserUpdate={handleUserUpdate}
            onClose={() => setSelectedComponent(null)}
          />
        );
      case "tienphong":
        return (
          <ListTienphong
            option={selectedOption}
            user={user}
            onUserUpdate={handleUserUpdate}
            onClose={() => setSelectedComponent(null)}
          />
        );
      case "phongtro":
        return (
          <ListPhongtro
            option={selectedOption}
            user={user}
            onUserUpdate={handleUserUpdate}
            onClose={() => setSelectedComponent(null)}
          />
        );
      case "themNguoi":
        return (
          <ThemNguoiComponent
            user={user}
            onClose={() => setSelectedComponent(null)}
            onUserUpdate={handleUserUpdate}
          />
        );
      case "chuyenRa":
        return <ChuyenRaComponent onClose={() => setSelectedComponent(null)} />;
      case "thuTien":
        return <ThuTienComponent onClose={() => setSelectedComponent(null)} />;
      case "noiQuy":
        return <NoiQuyComponent onClose={() => setSelectedComponent(null)} />;
      case "tamTru":
        return <TamTruComponent onClose={() => setSelectedComponent(null)} />;
      case "thongbao":
        return <Thongbao onClose={() => setSelectedComponent(null)} />;
      case "lienhe":
        return <Lienhe onClose={() => setSelectedComponent(null)} />;
      case "caiDat":
        return <CaiDatComponent onClose={() => setSelectedComponent(null)} />;
      default:
        return null;
    }
  };

  // Hàm để đo lường tốc độ kết nối
  function measureConnectionSpeed() {
    const startTime = Date.now();

    // Gửi một tin nhắn đến server để đo thời gian phản hồi
    window.socket.emit("ping", (responseTime) => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Hiển thị thời gian phản hồi
      console.log(`Tốc độ kết nối: ${duration} ms`);
    });
  }
  useEffect(() => {
    setCookie("user_name", "JohnDoe", 7);
    const io_socket = async () => {
      window.socket = await io(SOCKET_SERVER_URL, {
        transports: ["websocket"],
      });
      window.socket.on("room_data", (data) => {
        console.log("room_data", data);
      });
      window.socket.on("user online", (data) => {
        console.log(data);
      });
      window.socket.on("message", async function (msg) {
        console.log(msg);
      });
      window.socket.on("chat message", (data) => {
        const { message, sender } = data;
        console.log(sender + " :", message);
      });

      window.socket.on("user joined", (userId) => {
        console.log("User joined", userId);
      });

      window.socket.on("user left", (userId) => {
        console.log("User out room", userId);
      });

      window.socket.on("user disconnected", (userId) => {
        console.log("User disconnected", userId);
      });

      // Gọi hàm ping mỗi 5 giây
      setInterval(measureConnectionSpeed, 5000);
    };

    io_socket();

    return () => {
      if (window.socket) {
        window.socket.disconnect();
      }
    };
  }, []);
  return (
    <div className="body-container" style={nhatro_style}>
      <div className="top-container">
        <div className="avatar-box">
          <div className="avatar">
            <img src={user?.zalo?.avatar} alt="User Avatar" />
          </div>
          <div className="name">Xin chào, {user?.zalo?.name}</div>
        </div>
      </div>
      <div className="home-view-container">
        <div className="sliders-container snap">
          <Alert_box alerts={alerts} handleAlert={handleAlertSelect} />
        </div>
        <Db_box user={user} handleShow={handleDashboard} />
        <div className="tool-container snap">
          <div
            className="items"
            onClick={() => handleComponentSelect("themNguoi")}
          >
            <div className="icons">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="name">Thêm người mới vào</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("chuyenRa")}
          >
            <div className="icons">
              <i className="fa-solid fa-user-minus"></i>
            </div>
            <div className="name">Chuyển ra</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("thuTien")}
          >
            <div className="icons">
              <i className="fa-solid fa-coins"></i>
            </div>
            <div className="name">Thu tiền</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("noiQuy")}
          >
            <div className="icons">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="name">Nội quy</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("tamTru")}
          >
            <div className="icons">
              <i className="fa-solid fa-users-gear"></i>
            </div>
            <div className="name">Tạm trú (3 người chưa đăng ký)</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("thongbao")}
          >
            <div className="icons">
              <i className="fa-solid fa-bell"></i>
            </div>
            Thông báo ({alerts.filter((alert) => !alert.readed).length})
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("lienhe")}
          >
            <div className="icons">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className="name">Liên hệ và hỗ trợ</div>
          </div>
          <div
            className="items"
            onClick={() => handleComponentSelect("caiDat")}
          >
            <div className="icons">
              <i className="fa-solid fa-gears"></i>
            </div>
            <div className="name">Cài đặt</div>
          </div>
        </div>
        <div className="details-container"></div>
        <div className="history-container"></div>
      </div>
      <div className="popup-container">{renderComponent()}</div>
    </div>
  );
};

export default Nhatro;
