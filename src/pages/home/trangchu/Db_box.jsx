import React from "react";
import house from "../../../img/house_mini.png";
import bedroom from "../../../img/bedroom.png";
import ratings from "../../../img/ratings.png";
import exit_room from "../../../img/exit_room.png";
import soon from "../../../img/nhatro/wearther/sun.png";
import moon from "../../../img/nhatro/wearther/moon.png";
import caicua from "../../../img/nhatro/2005314.png";
import leave from "../../../img/leave.png";
import money from "../../../img/banknotes_12748234.png";

const Db_box = ({ user }) => {
  return (
    <div className="dashboard-container snap">
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={house} />
        </div>
        <div className="data">
          <div className="title">Nhà trọ</div>
          <div className="value">{user?.nhatro?.length}</div>
          <div className="description"></div>
        </div>
      </div>
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={bedroom} />
        </div>
        <div className="data">
          <div className="title">Số phòng</div>
          <div className="value">{user?.nhatro?.length * 10}</div>
          <div className="description"></div>
        </div>
      </div>
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={ratings} />
        </div>
        <div className="data">
          <div className="title">Đang ở</div>
          <div className="value">{user?.nhatro?.length * 10}</div>
          <div className="description"></div>
        </div>
      </div>
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={exit_room} />
        </div>
        <div className="data">
          <div className="title">Phòng trống</div>
          <div className="value">{user?.nhatro?.length}</div>
          <div className="description"></div>
        </div>
      </div>
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={leave} />
        </div>
        <div className="data">
          <div className="title">Nợ tháng trước</div>
          <div className="value">5,260,000</div>
          <div className="description"></div>
        </div>
      </div>
      <div className="dashboard-item nhatro">
        <div className="logo">
          <img src={money} />
        </div>
        <div className="data">
          <div className="title">Tạm tính</div>
          <div className="value">15,620,000</div>
          <div className="description"></div>
        </div>
      </div>
    </div>
  );
};

export default Db_box;
