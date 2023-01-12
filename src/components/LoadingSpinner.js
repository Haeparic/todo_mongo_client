import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        // position: "fixed",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <PacmanLoader
        color="#ffe737"
        height={15}
        width={5}
        radius={2}
        margin={2}
      />
    </div>
  );
};

export default LoadingSpinner;
