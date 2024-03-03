import React from "react";
import TemporaryDrawer from "../../components/Utilities/SideDrawer";

export default function HomePage() {
  return (
    <>
      <TemporaryDrawer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <svg
          width="500"
          height="500"
          viewBox="-30 -30 460 460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(200,200) rotate(30)">
            <circle cx="0" cy="0" r="215" fill="black" />
            <path
              id={1}
              d="M0,-200A200,200 0 0,1 173.2,-100L0,0Z"
              fill="#80f155"
            />
            <path
              id={2}
              d="M173.2,-100A200,200 0 0,1 173.2,100L0,0Z"
              fill="black"
            />
            <path
              id={3}
              d="M173.2,100A200,200 0 0,1 0,200L0,0Z"
              fill="#80f155"
            />
            <path
              id={4}
              d="M0,200A200,200 0 0,1 -173.2,100L0,0Z"
              fill="black"
            />
            <path
              id={5}
              d="M-173.2,100A200,200 0 0,1 -173.2,-100L0,0Z"
              fill="#80f155"
            />
            <path
              id={6}
              d="M-173.2,-100A200,200 0 0,1 0,-200L0,0Z"
              fill="black"
            />
            <circle cx="0" cy="0" r="60" fill="black" />
            <circle cx="0" cy="0" r="40" fill="#80f155" />
          </g>
        </svg>
      </div>
    </>
  );
}
