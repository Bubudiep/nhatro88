import React, { useState, useEffect } from "react";
const Home = () => {
  // Tạo state để quản lý trạng thái loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng quá trình tải dữ liệu trong 2 giây
    const timer = setTimeout(() => {
      setLoading(false); // Đặt trạng thái không còn loading
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      <div className={"loading-box " + (loading && "active")}>
        {loading ? "Loading..." : "Content loaded!"}
      </div>
    </div>
  );
};

export default Home;
