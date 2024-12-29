// src/components/SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC<{ width?: string; height?: string }> = ({
  width = "100%",
  height = "20px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#E0E0E0", // Light gray color
        borderRadius: "4px",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
};

export default SkeletonLoader;
