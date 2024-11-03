import React, { Suspense, useEffect, useContext, useState } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import Logo from "../img/logo.png";
import Background_ct from "../img/bg_city.jpg";
import api from "../components/api";
import app from "../components/all";
import {
  authorize,
  getAccessToken,
  getPhoneNumber,
  getSetting,
  getUserInfo,
} from "zmp-sdk/apis";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMassage] = useState(null);
  const { user, setUser } = useContext(UserContext); // Lấy context
  const [isAccept, setIsaccept] = useState(true);
  const navigate = useNavigate();
  const pageStyle = {
    backgroundImage: `url(${Background_ct})`,
  };
  const params = new URLSearchParams(location.search);
  const app_key = import.meta.env.VITE_ZALO_KEY;
  console.log("Start");
  const handleStart = () => {
    setLoading(true);
    let scope = [];
    getSetting({
      success: (data) => {
        if (
          data.authSetting["scope.userInfo"] == true &&
          data.authSetting["scope.userPhonenumber"] == true
        ) {
          getAccessToken({
            success: (accessToken) => {
              console.log(accessToken);
              if (accessToken) {
                getPhoneNumber({
                  success: async (data) => {
                    let { token } = data;
                    api
                      .gets("https://graph.zalo.me/v2.0/me/info", {
                        access_token: accessToken,
                        code: token,
                        secret_key: app_key,
                      })
                      .then((response) => {
                        const phone_number = response?.data?.number;
                        if (phone_number) {
                          getUserInfo({
                            success: (data) => {
                              api
                                .post("/zlogin/", {
                                  zalo_id: data.userInfo.id,
                                  zalo_phone: phone_number,
                                  zalo_name: data.userInfo.name,
                                  zalo_avatar: data.userInfo.avatar,
                                })
                                .then((response) => {
                                  setUser({
                                    zalo: data.userInfo,
                                    app: response, // Cập nhật user.app
                                  });
                                  const from = params.get("from");
                                  const key = params.get("KEY");
                                  if (from && key) {
                                    navigate("/" + from + "?KEY=" + key, {
                                      replace: true,
                                      animate: true,
                                      direction: "forward",
                                    });
                                  } else {
                                    navigate("/", {
                                      replace: true,
                                      animate: true,
                                      direction: "forward",
                                    });
                                  }
                                  setLoading(false);
                                })
                                .catch((error) => {
                                  console.log(error);
                                  api
                                    .post("/register/", {
                                      zalo_id: data.userInfo.id,
                                      username: data.userInfo.id,
                                      password: app.random(10),
                                      zalo_name: data.userInfo.name,
                                      zalo_avatar: data.userInfo.avatar,
                                      email: data.userInfo.id + "@gmail.com",
                                      zalo_phone: phone_number,
                                    })
                                    .then((response) => {
                                      console.log(response);
                                      setUser({
                                        zalo: data.userInfo,
                                        app: response, // Cập nhật user.app
                                      });
                                      const params = new URLSearchParams(
                                        location.search
                                      );
                                      const from = params.get("from");
                                      const key = params.get("KEY");
                                      if (from && key) {
                                        navigate("/" + from + "?KEY=" + key, {
                                          replace: true,
                                          animate: true,
                                          direction: "forward",
                                        });
                                      } else {
                                        navigate("/", {
                                          replace: true,
                                          animate: true,
                                          direction: "forward",
                                        });
                                      }
                                    })
                                    .catch((error) => {
                                      setLoading(false);
                                      setMassage(
                                        "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                                      );
                                      console.error(
                                        "Error fetching data:",
                                        error
                                      );
                                    });
                                });
                            },
                            fail: (error) => {
                              setLoading(false);
                              setMassage(
                                "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                              );
                              console.error("Error fetching data:", error);
                            },
                          });
                        }
                      })
                      .catch((error) => {
                        console.error("Lỗi:", error);
                        setMassage(
                          "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                        );
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  },
                  fail: (error) => {
                    setLoading(false);
                    setMassage("Lỗi kết nối máy chủ! Vui lòng thử lại sau!");
                    console.error("Error fetching data:", error);
                  },
                });
              } else {
                setLoading(false);
                setMassage(
                  "Ứng dụng chưa được cấp phép, vui lòng thử lại sau!"
                );
                console.error("Error fetching data:", error);
              }
            },
            fail: (error) => {
              setLoading(false);
              setMassage("Lỗi kết nối máy chủ! Vui lòng thử lại sau!");
              console.error("Error fetching data:", error);
            },
          });
        } else {
          authorize({
            scopes: ["scope.userInfo", "scope.userPhonenumber"],
            success: (data) => {
              if (Object.keys(data).length == 0) {
                getUserInfo({
                  success: (data) => {
                    api
                      .post("/zlogin/", {
                        zalo_id: data.userInfo.id,
                      })
                      .then((response) => {
                        console.log(response);
                        setUser({
                          zalo: data.userInfo,
                          app: response, // Cập nhật user.app
                        });
                        const from = params.get("from");
                        const key = params.get("KEY");
                        if (from && key) {
                          navigate("/" + from + "?KEY=" + key, {
                            replace: true,
                            animate: true,
                            direction: "forward",
                          });
                        } else {
                          navigate("/", {
                            replace: true,
                            animate: true,
                            direction: "forward",
                          });
                        }
                        setLoading(false);
                      })
                      .catch((error) => {
                        console.log(error);
                        api
                          .post("/register/", {
                            zalo_id: data.userInfo.id,
                            username: data.userInfo.id,
                            password: app.random(10),
                            email: data.userInfo.id + "@gmail.com",
                          })
                          .then((response) => {
                            console.log(response);
                            setUser({
                              zalo: data.userInfo,
                              app: response, // Cập nhật user.app
                            });
                            const from = params.get("from");
                            const key = params.get("KEY");
                            if (from && key) {
                              navigate("/" + from + "?KEY=" + key, {
                                replace: true,
                                animate: true,
                                direction: "forward",
                              });
                            } else {
                              navigate("/", {
                                replace: true,
                                animate: true,
                                direction: "forward",
                              });
                            }
                          })
                          .catch((error) => {
                            setLoading(false);
                            setMassage(
                              "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                            );
                            console.error("Error fetching data:", error);
                          });
                      });
                  },
                });
                return;
              }
              getAccessToken({
                success: (accessToken) => {
                  console.log(accessToken);
                  if (accessToken) {
                    getPhoneNumber({
                      success: async (data) => {
                        let { token } = data;
                        api
                          .gets("https://graph.zalo.me/v2.0/me/info", {
                            access_token: accessToken,
                            code: token,
                            secret_key: app_key,
                          })
                          .then((response) => {
                            const phone_number = response?.data?.number;
                            if (phone_number) {
                              getUserInfo({
                                success: (data) => {
                                  api
                                    .post("/zlogin/", {
                                      zalo_id: data.userInfo.id,
                                      zalo_phone: phone_number,
                                      zalo_name: data.userInfo.name,
                                      zalo_avatar: data.userInfo.avatar,
                                    })
                                    .then((response) => {
                                      setUser({
                                        zalo: data.userInfo,
                                        app: response, // Cập nhật user.app
                                      });
                                      const from = params.get("from");
                                      const key = params.get("KEY");
                                      if (from && key) {
                                        navigate("/" + from + "?KEY=" + key, {
                                          replace: true,
                                          animate: true,
                                          direction: "forward",
                                        });
                                      } else {
                                        navigate("/", {
                                          replace: true,
                                          animate: true,
                                          direction: "forward",
                                        });
                                      }
                                      setLoading(false);
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                      api
                                        .post("/register/", {
                                          zalo_id: data.userInfo.id,
                                          username: data.userInfo.id,
                                          password: app.random(10),
                                          zalo_name: data.userInfo.name,
                                          zalo_avatar: data.userInfo.avatar,
                                          email:
                                            data.userInfo.id + "@gmail.com",
                                          zalo_phone: phone_number,
                                        })
                                        .then((response) => {
                                          console.log(response);
                                          setUser({
                                            zalo: data.userInfo,
                                            app: response, // Cập nhật user.app
                                          });
                                          const params = new URLSearchParams(
                                            location.search
                                          );
                                          const from = params.get("from");
                                          const key = params.get("KEY");
                                          if (from && key) {
                                            navigate(
                                              "/" + from + "?KEY=" + key,
                                              {
                                                replace: true,
                                                animate: true,
                                                direction: "forward",
                                              }
                                            );
                                          } else {
                                            navigate("/", {
                                              replace: true,
                                              animate: true,
                                              direction: "forward",
                                            });
                                          }
                                        })
                                        .catch((error) => {
                                          setLoading(false);
                                          setMassage(
                                            "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                                          );
                                          console.error(
                                            "Error fetching data:",
                                            error
                                          );
                                        });
                                    });
                                },
                                fail: (error) => {
                                  setLoading(false);
                                  setMassage(
                                    "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                                  );
                                  console.error("Error fetching data:", error);
                                },
                              });
                            }
                          })
                          .catch((error) => {
                            console.error("Lỗi:", error);
                            setMassage(
                              "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                            );
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      },
                      fail: (error) => {
                        setLoading(false);
                        setMassage(
                          "Lỗi kết nối máy chủ! Vui lòng thử lại sau!"
                        );
                        console.error("Error fetching data:", error);
                      },
                    });
                  } else {
                    setLoading(false);
                    setMassage(
                      "Ứng dụng chưa được cấp phép, vui lòng thử lại sau!"
                    );
                    console.error("Error fetching data:", error);
                  }
                },
                fail: (error) => {
                  setLoading(false);
                  setMassage("Lỗi kết nối máy chủ! Vui lòng thử lại sau!");
                  console.error("Error fetching data:", error);
                },
              });
            },
            fail: (error) => {
              console.log(error);
              setLoading(false);
              setMassage("Chưa có dữ liệu cấp quyền Zalo!");
            },
          });
        }
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };
  return (
    <div className="start-page h-[101vh]" style={pageStyle}>
      <div className="logo">
        <img src={Logo} />
        <div className="name">Nhà trọ 88</div>
      </div>
      <div className="sologan">Quản lý nhà trọ dễ dàng, thông minh!</div>
      <div className="box-details pt-4">
        <ul>
          <li>Tìm phòng trọ phù hợp xung quanh bạn.</li>
          <li>
            Thống kê chi tiết ngày bắt đầu thuê trọ, lịch thanh toán, lập kế
            hoạch, tính toán chi phí.
          </li>
          <li>
            Lưu trữ hóa đơn thanh toán hàng tháng kể cả khi bạn chuyển qua phòng
            khác
          </li>
          <li>Nhắc nhở thông minh khi đến kỳ hạn đóng tiền phòng.</li>
        </ul>
      </div>
      <div className="hint-login">
        <div className="mes">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isAccept}
              onChange={(e) => {
                setIsaccept(e.target.checked);
              }}
            />
          </div>
          Cung cấp số điện thoại và tên Zalo của bạn để đăng nhập!
        </div>
      </div>
      {loading ? (
        <div className="p-3">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        message && <div className="error-message p-3">{message}</div>
      )}
      <div className="flex mt-3 w-full justify-center">
        <button
          className="start-btn"
          disabled={!isAccept}
          onClick={() => {
            handleStart();
          }}
        >
          Đăng nhập
        </button>
      </div>
      <div className="hint">Phiên bản 1.1.58-2482. Zalo-mini-app</div>
    </div>
  );
};

export default HomePage;
