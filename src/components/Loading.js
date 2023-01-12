import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const Loading = () => {
  const loadingCSS = {
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
  };
  return (
    <div style={loadingCSS}>
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default Loading;