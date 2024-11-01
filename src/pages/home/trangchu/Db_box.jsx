import React, { useContext } from "react";
import house from "../../../img/house_mini.png";
import bedroom from "../../../img/bedroom.png";
import ratings from "../../../img/ratings.png";
import exit_room from "../../../img/exit_room.png";
import leave from "../../../img/leave.png";
import money from "../../../img/banknotes_12748234.png";

const Db_box = ({ user, handleShow }) => {
  history.pushState(null, "", window.location.href);
  const dashboardItems = [
    {
      title: "Danh sách Nhà",
      name: "nhatro",
      value: (user) => user?.nhatro?.length || 0,
      img: house,
    },
    {
      title: "Danh sách Phòng",
      name: "phongtro",
      value: (user) =>
        user?.nhatro.reduce((total, item) => {
          return (
            total +
            item.Thongtin.reduce(
              (subTotal, thongtin) => subTotal + thongtin.Chitiet.length,
              0
            )
          );
        }, 0),
      img: bedroom,
    },
    {
      title: "Người đang trọ",
      name: "nguoitro",
      value: (user) =>
        user?.nhatro.reduce((total, item) => {
          return (
            total +
            item.Thongtin.reduce((total, thongtinItem) => {
              return (
                total +
                thongtinItem.Chitiet.reduce((chitietTotal, chitietItem) => {
                  const onlineCount = chitietItem.Nguoitro.length;
                  return chitietTotal + onlineCount;
                }, 0)
              );
            }, 0)
          );
        }, 0),
      img: ratings,
    },
    {
      title: "Phòng trống",
      name: "phongtro_off",
      value: (user) =>
        user?.nhatro.reduce((total, item) => {
          return (
            total +
            item.Thongtin.reduce((total, thongtinItem) => {
              return (
                total +
                thongtinItem.Chitiet.reduce((chitietTotal, chitietItem) => {
                  return (
                    chitietTotal + (chitietItem.Nguoitro.length === 0 ? 1 : 0)
                  );
                }, 0)
              );
            }, 0)
          );
        }, 0),
      img: exit_room,
    },
    {
      title: "Nợ tháng trước",
      name: "tienphong_no",
      value: 0,
      img: leave,
    },
    {
      title: "Tạm tính",
      name: "tienphong",
      value: 0,
      img: money,
    },
  ];
  return (
    <div className="dashboard-container snap">
      {dashboardItems.map((item, index) => (
        <div
          className="dashboard-item nhatro"
          key={index}
          onClick={() => handleShow(item?.name)}
        >
          <div className="logo">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="data">
            <div className="title">{item.title}</div>
            <div className="value">
              {typeof item.value === "function" ? item.value(user) : item.value}
            </div>
            <div className="description"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Db_box;
