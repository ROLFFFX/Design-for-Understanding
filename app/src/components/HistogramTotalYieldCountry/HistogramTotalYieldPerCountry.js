import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TemporaryDrawer from "../Utilities/SideDrawer";
import { BarChart } from "@mui/x-charts/BarChart";

export default function HistogramTotalYieldPerCountry() {
  const [screenSize, setScreenSize] = useState({
    windowwidth: window.innerWidth,
    windowheight: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        windowwidth: window.innerWidth,
        windowheight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <Box p={2}>
        <TemporaryDrawer />
      </Box>
      <Grid container>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", mt: -6.5 }}>
            <Typography
              sx={{
                fontFamily: "PT Mono",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Total Yield Per Country
            </Typography>
          </Box>
        </Grid>
        {/* Graph */}
        <Grid container item xs={7}>
          <Grid item xs={1}></Grid>
          <Typography
            position={"relative"}
            sx={{
              marginBottom: "-20px",
              marginTop: "10px",
              marginLeft: "-16px",
              fontFamily: "PT Mono",
            }}
          >
            Yield(Kilotons)
          </Typography>
          <Box>
            {/* USA: Lower Total Yield = 168585.4356999999 kt, Upper Total Yield =
            232941.5376999999 kt USSR: Lower Total Yield = 232420.46899999725
            kt, Upper Total Yield = 370460.33099999937 kt UK: Lower Total Yield
            = 8398.6 kt, Upper Total Yield = 10808.0 kt FRANCE: Lower Total
            Yield = 220.0 kt, Upper Total Yield = 21510.0 kt CHINA: Lower Total
            Yield = 16853.0 kt, Upper Total Yield = 25926.0 kt INDIA: Lower
            Total Yield = 0.0 kt, Upper Total Yield = 41.0 kt PAKIST: Lower
            Total Yield = 0.0 kt, Upper Total Yield = 53.0 kt */}
            <Box
              position={"absolute"}
              marginLeft={70}
              marginRight={20}
              marginTop={20}
            >
              <Typography fontFamily={"PT Mono"}>
                This interactive histogram graph displays the aggregate yield of
                nuclear explosions per country in kilotons, featuring the USA,
                USSR, UK, France, China, India, and Pakistan on the y-axis.{" "}
                <br />
                <br />
                To access detailed information, hover over the bars
                corresponding to each country.
              </Typography>
            </Box>
            <BarChart
              colors={["#0288d1", "#00796b"]}
              margin={{ left: 80 }}
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "USA",
                    "USSR",
                    "UK",
                    "FRANCE",
                    "CHINA",
                    "INDIA",
                    "PAKIST",
                  ],
                  label: "Country",
                  tickLabelStyle: {
                    fontFamily: "PT Mono",
                  },
                  labelStyle: {
                    fontFamily: "PT Mono",
                  },
                },
              ]}
              series={[
                {
                  data: [232941.5, 370460.3, 10808, 21510, 25926, 41, 53],
                  name: "Upper Yield",
                  valueFormatter: (value) => (
                    <Typography fontFamily="PT Mono">
                      Upper Yield: {value} Kilotons
                    </Typography>
                  ),
                },
                {
                  data: [168585.4, 232420.4, 8398.6, 220.0, 16853.0, 0, 0],
                  name: "Lower Yield",
                  valueFormatter: (value) => (
                    <Typography fontFamily="PT Mono">
                      Lower Yield: {value} Kilotons
                    </Typography>
                  ),
                },
              ]}
              width={screenSize.windowwidth * 0.9}
              height={screenSize.windowheight * 0.8}
            />
          </Box>

          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
