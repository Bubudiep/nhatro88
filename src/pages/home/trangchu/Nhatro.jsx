import React from "react";
import house from "../../../img/house_mini.png";
import bedroom from "../../../img/bedroom.png";
import ratings from "../../../img/ratings.png";
import exit_room from "../../../img/exit_room.png";
import soon from "../../../img/nhatro/wearther/sun.png";
import moon from "../../../img/nhatro/wearther/moon.png";
import wallpp from "../../../img/nhatro/1370.jpg";
import caicua from "../../../img/nhatro/2005314.png";
const Nhatro = ({ user }) => {
  console.log(user);
  const nhatro_style = {
    backgroundImage: `url(${wallpp})`,
  };
  return (
    <div className="body-container">
      <div className="home-view-container">
        <div className="top-container">
          <div className="avatar-box">
            <div className="avatar">
              <img src={user?.zalo?.userInfo?.avatar} />
            </div>
            <div className="name">{user?.zalo?.userInfo?.name}</div>
          </div>
        </div>
        {/* <div className="sliders-container">x</div> */}
        <div className="nhatro-view">
          <div className="nhatro-top">
            <div className="icons">
              <img src={soon} />
            </div>
          </div>
          <div className="nhatro">
            <div className="cai-nhatro">
              <div className="cainoc">
                <div className="cai-ongkhoi">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="caicua"></div>
              <div className="nhatro-layout">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div className="room">
                          <div className="sophong">06</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">07</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">08</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">09</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">10</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="room">
                          <div className="sophong">06</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">07</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">08</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">09</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">10</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="room on">
                          <div className="sophong">01</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">02</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">03</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">04</div>
                        </div>
                      </td>
                      <td>
                        <div className="room on">
                          <div className="sophong">05</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="trang-tri"></div>
          </div>
          <div className="nhatro-bot"></div>
          <div className="nhatro-duong"></div>
        </div>
        <div className="dashboard-container">
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
        </div>
        <div className="tool-container">
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div className="name">Thêm người mới vào</div>
          </div>
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-user-minus"></i>
            </div>
            <div className="name">Chuyển ra</div>
          </div>
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-coins"></i>
            </div>
            <div className="name">Thu tiền</div>
          </div>
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="name">Nội quy</div>
          </div>
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-users-gear"></i>
            </div>
            <div className="name">Tạm trú (3 người chưa đăng ký)</div>
          </div>
          <div className="items">
            <div className="icons">
              <i className="fa-solid fa-gears"></i>
            </div>
            <div className="name">Cài đặt</div>
          </div>
        </div>
        <div className="details-container"></div>
        <div className="history-container"></div>
      </div>
    </div>
  );
};

export default Nhatro;
