import React from "react";
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <div className="avatar">
          <img src={user.zalo.userInfo.avatar} />
        </div>
        <div className="msg">
          Chào buổi sáng, <div className="name">{user.zalo.userInfo.name}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
