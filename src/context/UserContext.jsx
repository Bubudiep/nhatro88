import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Khởi tạo giá trị user từ localStorage nếu có
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  });

  const [loading, setLoading] = useState(false); // Giữ loading ban đầu là false

  // Hàm cập nhật user và lưu vào localStorage
  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: updateUser, isAuthenticated: !!user, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
