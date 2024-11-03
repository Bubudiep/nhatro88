import React, { useEffect, useState, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "zmp-ui";
import api from "../../../components/api";
import { getSetting } from "zmp-sdk/apis";
import { UserContext } from "../../../context/UserContext";
import logo from "../../../img/logo.png";
import { openPhone } from "zmp-sdk/apis";

const NhatroHome = () => {
  const [isLoading, setIsloading] = useState(false);
  const { user, setUser } = useContext(UserContext); // Lấy context
  const [token, settoken] = useState(user?.app?.access_token);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogined = useState(false);
  const params = new URLSearchParams(location.search);
  const key = params.get("KEY");
  const [nhatro, setnhatro] = useState(false);
  useEffect(() => {
    getSetting({
      success: (data) => {
        const auth = data.authSetting;
        if (auth["scope.userInfo"]) {
          if (auth["scope.userInfo"] === false) {
            navigate("/start?from=nhatro&KEY=" + key);
          }
          if (auth["scope.userPhonenumber"] === false) {
            navigate("/start?from=nhatro&KEY=" + key);
          }
        }
        if (user == null) {
          navigate("/start?from=nhatro&KEY=" + key);
        } else {
          if (!key) {
            navigate("/start?from=nhatro&KEY=" + key);
          } else {
            console.log("Lấy thông tin nhà trọ");
            setIsloading(true);
            const nhatro = api
              .get("/kiemtra_tro/?KEY=" + key, token)
              .then((response) => {
                console.log(response);
                setnhatro(response);
              })
              .catch((error) => {
                console.error("Lỗi khi lấy thông tin nhà trọ:", error);
              })
              .finally(() => {
                setIsloading(false);
              });
            console.log("KEY:", key); // Use the KEY as needed
          }
        }
      },
      fail: (error) => {
        navigate("/start?from=nhatro&KEY=" + key);
      },
    });
  }, []);
  const handleCall = async () => {
    console.log(nhatro?.hotline);
    try {
      await openPhone({
        phoneNumber: nhatro?.hotline,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="nhatroHome-container">
      {isLoading ? (
        <div className="fullLoad">
          <div className="loading-spinner" />
        </div>
      ) : (
        <>
          <div className="top-menu"></div>
          <div className="body_view">
            <div className="thongtin-nhatro">
              <div className="logo">
                <img src={nhatro?.logo ?? logo} />
              </div>
              <div className="nhatro">{nhatro?.tenTro}</div>
              <div className="hotline">
                {nhatro?.hotline ? (
                  <div className="phone" onClick={handleCall}>
                    <i class="fa-solid fa-phone-volume"></i> Gọi ngay:{" "}
                    {nhatro?.hotline}
                  </div>
                ) : (
                  "Chưa cài hotline"
                )}
              </div>
            </div>
            <div className="nhatro-option">
              <div className="tab">
                <div className={`items ${nhatro?.dieuhoa && "on"}`}>
                  <div className="logo">
                    <i className="fa-solid fa-fan"></i>
                  </div>
                  <div className="name">
                    {nhatro?.dieuhoa ? "Có" : "Chưa"} điều hòa
                  </div>
                  <div className="value"></div>
                </div>
                <div className={`items ${nhatro?.nonglanh && "on"}`}>
                  <div className="logo">
                    <i className="fa-solid fa-shower"></i>
                  </div>
                  <div className="name">
                    {nhatro?.nonglanh ? "Có" : "Chưa"} nóng lạnh
                  </div>
                  <div className="value"></div>
                </div>
                <div className={`items ${nhatro?.wifi && "on"}`}>
                  <div className="logo">
                    <i className="fa-solid fa-wifi"></i>
                  </div>
                  <div className="name">
                    {nhatro?.wifi ? "Có" : "Chưa"} wifi
                  </div>
                  <div className="value"></div>
                </div>
              </div>
              <div className="tab last">
                <div className="items">
                  <div className="name">
                    {"Điện " + nhatro?.tiendien?.toLocaleString("vi-VN")}đ/số
                  </div>
                  <div className="logo">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                </div>
                <div className="items">
                  <div className="name">
                    {"Nước " + nhatro?.tiennuoc?.toLocaleString("vi-VN")}đ/khối
                  </div>
                  <div className="logo">
                    <i className="fa-solid fa-droplet"></i>
                  </div>
                </div>
                <div className="items">
                  <div className="name">
                    {"Rác " + nhatro?.tienrac?.toLocaleString("vi-VN")}đ/tháng
                  </div>
                  <div className="logo">
                    <i className="fa-solid fa-recycle"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="diachi">
              <div className="logo">
                <i className="fa-solid fa-house-user"></i>
              </div>
              <div className="value">
                {nhatro?.chungchu ? "Chung chủ" : "Không chung chủ"}
              </div>
            </div>
            <div className="diachi">
              <div className="logo">
                <i className="fa-solid fa-comments-dollar"></i>
              </div>
              <div className="value">
                {nhatro?.tienphong
                  ? "Giá phòng ~" +
                    nhatro?.tienphong?.toLocaleString("vi-VN") +
                    "đ"
                  : "Chưa có giá"}
              </div>
            </div>
            <div className="diachi">
              <div className="logo">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="value">{nhatro?.diachi ?? "Chưa có địa chỉ"}</div>
            </div>
            <div className="h3">
              <div className="logo">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="name">Danh sách phòng</div>
            </div>
            <div className="layout-tang">
              {nhatro?.Tang?.map((tang) => (
                <div key={tang.id}>
                  <div className="tang">{tang.tenTang}</div>
                  <div className="layout">
                    {tang?.Phong?.map((phong, index) => (
                      <div
                        className={`items ${phong.nguoitro > 0 && "off"}`}
                        key={`${phong.id}-${index}`}
                      >
                        <div className="name">{phong.soPhong}</div>
                        <div className="status">
                          {phong.nguoitro === 0 ? "Trống" : "Có người ở"}
                        </div>
                        <div className="giaphong">
                          {phong.tienphong.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="options">
                          <div className={`opt-t ${phong.dieuhoa && "on"}`}>
                            <i className="fa-solid fa-fan"></i>
                          </div>
                          <div className={`opt-t ${phong.nonglanh && "on"}`}>
                            <i className="fa-solid fa-shower"></i>
                          </div>
                          <div className={`opt-t ${phong.wifi && "on"}`}>
                            <i className="fa-solid fa-wifi"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="h3">
              <div className="logo">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div className="name">Nội quy</div>
            </div>
            <div className="noiquy">
              {nhatro?.Noiquy?.map((noiquy, idx) => (
                <div className="items" key={idx}></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NhatroHome;
