import React, { useState } from "react";
import TemporaryDrawer from "../../components/Utilities/SideDrawer";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const backgroundStyles = {
  backgroundImage:
    "radial-gradient(circle, rgb(100, 100, 100), rgb(215, 215, 215) 1px, rgb(255, 255, 255) 1px, rgb(255, 255, 255))",
  backgroundSize: "28px 28px",
  minHeight: "100vh",
  marginTop: "-80px",
  paddingTop: "80px",
};

export default function HomePage() {
  const navigate = useNavigate();
  const [isHovering6, setIsHovering6] = useState(false);
  const [isHovering5, setIsHovering5] = useState(false);
  const [isHovering4, setIsHovering4] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering1, setIsHovering1] = useState(false);
  return (
    <div style={backgroundStyles} className="movingBackground">
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
                id={1}
                d="M0,-200A200,200 0 0,1 173.2,-100L0,0Z"
                fill="#80f155"
                className="green"
                onMouseEnter={() => {
                  setIsHovering1(true);
                }}
                onMouseLeave={() => {
                  setIsHovering1(false);
                }}
                onClick={() => {
                  navigate("https://google.com");
                }}
              />
              {/* Black Segment */}
              <path
                id={2}
                d="M173.2,-100A200,200 0 0,1 173.2,100L0,0Z"
                fill="black"
                className="black"
                onMouseEnter={() => {
                  setIsHovering2(true);
                }}
                onMouseLeave={() => {
                  setIsHovering2(false);
                }}
                onClick={() => {
                  navigate("https://google.com");
                }}
              />
              {/* Green Segment */}
              <path
                id={3}
                d="M173.2,100A200,200 0 0,1 0,200L0,0Z"
                fill="#80f155"
                className="green"
                onMouseEnter={() => {
                  setIsHovering3(true);
                }}
                onMouseLeave={() => {
                  setIsHovering3(false);
                }}
                onClick={() => {
                  navigate("https://google.com");
                }}
              />
              {/* Black Segment */}
              <path
                id={4}
                d="M0,200A200,200 0 0,1 -173.2,100L0,0Z"
                fill="black"
                className="black"
                onMouseEnter={() => {
                  setIsHovering4(true);
                }}
                onMouseLeave={() => {
                  setIsHovering4(false);
                }}
                onClick={() => {
                  navigate("/histogramyield");
                }}
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
            <span style={{ fontWeight: "bolder" }}>Purpose & Frequency</span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Pie Chart)
              <br />
              Click to View
            </span>
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
            <span style={{ fontWeight: "bolder" }}>
              Tests per Country Over Time
            </span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Stacked Bar Chart)
              <br />
              Click to View
            </span>
          </Typography>
        </div>
      )}
      {/* Histogram */}
      {isHovering4 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "63%",
            width: "33%",
            justifyContent: "right",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            <span style={{ fontWeight: "bolder" }}>
              Total Yield Per Country
            </span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Histogram)
              <br />
              Click to View
            </span>
          </Typography>
        </div>
      )}
      {/* Persuasive 1 */}
      {isHovering3 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "80%",
            width: "65%",
            justifyContent: "right",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            <span style={{ fontWeight: "bolder" }}>Nuclear Explosion</span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Multi-View Persuasive)
              <br />
              Click to View
            </span>
          </Typography>
        </div>
      )}
      {/* Persuasive 2 */}
      {isHovering2 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "65%",
            width: "90%",
            justifyContent: "right",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            <span style={{ fontWeight: "bolder" }}>Persuasive 2</span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Multi-View Persuasive)
              <br />
              Click to View
            </span>
          </Typography>
        </div>
      )}
      {/* Persuasive 1 */}
      {isHovering1 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: "33%",
            width: "90%",
            justifyContent: "right",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontFamily: "PT Mono" }}>
            <span style={{ fontWeight: "bolder" }}>Persuasive 1</span>{" "}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              (Multi-View Persuasive)
              <br />
              Click to View
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
}
