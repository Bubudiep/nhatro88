import React, { useState, useEffect } from "react";

function Popup() {
  const [error, setError] = useState(null);
  useEffect(() => {
    window.popup = {
      error: (message) => {
        setError(message);
      },
    };
  }, []);

  return (
    <div className="App">
      {/* Nội dung khác của ứng dụng */}
      <h1>Welcome to the app</h1>
      {/* Popup hiển thị lỗi */}
      {error && (
        <div className="error-popup">
          <div className="error-content">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
