import React, { useState } from "react";
import wallpp from "../../../img/nhatro/1370.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert_box from "./Alert_box";
import Db_box from "./Db_box";
import ThemNguoiComponent from "../tools/ThemNguoiComponent";
import ChuyenRaComponent from "../tools/ChuyenRaComponent";
import ThuTienComponent from "../tools/ThuTienComponent";
import NoiQuyComponent from "../tools/NoiQuyComponent";
import TamTruComponent from "../tools/TamTruComponent";
import CaiDatComponent from "../tools/CaiDatComponent";
const Nhatro = ({ user }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const nhatro_style = {
    backgroundImage: `url(${wallpp})`,
  };
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case "themNguoi":
        return (
          <ThemNguoiComponent onClose={() => setSelectedComponent(null)} />
        );
      case "chuyenRa":
        return <ChuyenRaComponent onClose={() => setSelectedComponent(null)} />;
      case "thuTien":
        return <ThuTienComponent onClose={() => setSelectedComponent(null)} />;
      case "noiQuy":
        return <NoiQuyComponent onClose={() => setSelectedComponent(null)} />;
      case "tamTru":
        return <TamTruComponent onClose={() => setSelectedComponent(null)} />;
      case "caiDat":
        return <CaiDatComponent onClose={() => setSelectedComponent(null)} />;
      default:
        return null;
    }
  };
  return (
    <div className="body-container">
      <div className="top-container">
        <div className="avatar-box">
          <div className="avatar">
            <img src={user?.zalo?.avatar} />
          </div>
          <div className="name">Xin chào, {user?.zalo?.name}</div>
        </div>
      </div>
      <div className="home-view-container">
        <div className="sliders-container snap">
          <Alert_box />
        </div>
        <Db_box user={user} />
        <div className="tool-container">
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
