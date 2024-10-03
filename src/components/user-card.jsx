import React from "react";
import bg_night from "../img/bg_city.png";
import bg_day from "../img/bg_day.png";
const UserCard = ({ user }) => {
  const hour = new Date().getHours();
  const pageStyle = {
    backgroundImage: `url(${hour > 16 ? bg_night : bg_day})`,
  };
  return (
    <div className="user-card" style={pageStyle}>
      <div className="user-info">
        <div className="avatar">
          <img src={user.zalo.userInfo.avatar} />
        </div>
        <div className="name">{user.zalo.userInfo.name}</div>
      </div>
    </div>
  );
};

export default UserCard;
