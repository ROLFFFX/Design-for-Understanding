import React, { useState } from "react";
import TemporaryDrawer from "../../components/Utilities/SideDrawer";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [isHovering6, setIsHovering6] = useState(false);
  const [isHovering5, setIsHovering5] = useState(false);
  return (
    <>
      <Box p={2}>
        <TemporaryDrawer />
      </Box>
      <Box sx={{ textAlign: "center", mt: -6 }}>
        <Typography
          sx={{
            fontFamily: "PT Mono",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Nuclear Explosions Data Visualization
        </Typography>
      </Box>
      <Box overflow="clip">
        <style>
          {`
        .green:hover {
          filter: drop-shadow(0 0 8px #80f155) drop-shadow(0 0 15px #80f155);
          cursor: pointer;
          position: absolute;
        }
        .black:hover {
          filter: drop-shadow(0 0 8px #000000) drop-shadow(0 0 15px #000000);
          cursor: pointer;
          position: absolute;
        }
        `}
        </style>
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
              {/* Green Segment */}
              <path
                d="M0,-200A200,200 0 0,1 173.2,-100L0,0Z"
                fill="#80f155"
                className="green"
              />
              {/* Black Segment */}
              <path
                d="M173.2,-100A200,200 0 0,1 173.2,100L0,0Z"
                fill="black"
                className="black"
              />
              {/* Green Segment */}
              <path
                d="M173.2,100A200,200 0 0,1 0,200L0,0Z"
                fill="#80f155"
                className="green"
              />
              {/* Black Segment */}
              <path
                d="M0,200A200,200 0 0,1 -173.2,100L0,0Z"
                fill="black"
                className="black"
              />
              {/* Green Segment */}
              <path
                id={5}
                d="M-173.2,100A200,200 0 0,1 -173.2,-100L0,0Z"
                fill="#80f155"
                className="green"
                onMouseEnter={() => {
                  setIsHovering5(true);
                }}
                onMouseLeave={() => {
                  setIsHovering5(false);
                }}
                onClick={() => {
                  navigate("/stackedbarchart");
                }}
              />
              {/* Black Segment */}
              <path
                id={6}
                d="M-173.2,-100A200,200 0 0,1 0,-200L0,0Z"
                fill="black"
                className="black"
                onMouseEnter={() => {
                  setIsHovering6(true);
                }}
                onMouseLeave={() => {
                  setIsHovering6(false);
                }}
                onClick={() => {
                  navigate("/piechartpurpose");
                }}
              />
              <circle cx="0" cy="0" r="60" fill="black" />
              <circle cx="0" cy="0" r="40" fill="#80f155" />
            </g>
          </svg>
        </div>
      </Box>
      {/* Analysis: Piechart: Top segment */}
      {isHovering6 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "12%",
            width: "98%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            Purpose & Frequency (Pie Chart)
            <br />
            Click to View
          </Typography>
        </div>
      )}

      {/* Analysis: Stacked Bar Chart */}
      {isHovering5 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "33%",
            width: "33%",
            justifyContent: "right",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            Tests per Country Over Time (Stacked Bar Chart)
            <br />
            Click to View
          </Typography>
        </div>
      )}
    </>
  );
}
