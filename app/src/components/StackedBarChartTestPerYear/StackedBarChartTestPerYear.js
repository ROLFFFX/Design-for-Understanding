import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import TemporaryDrawer from "../Utilities/SideDrawer";
import { LineChart } from "@mui/x-charts/LineChart";
import processed_nuclear_explosion_data from "./data/processed_nuclear_explosion_data.json";

const keyToLabel = {
  INDIA: "Republic of India",
  USSR: "Union of Soviet Socialist Republics",
  UK: "United Kingdom of Great Britain and Northern Ireland",
  USA: "United States of America",
  CHINA: "People's Republic of China (PRC)",
  FRANCE: "French Republic",
};

const colors = {
  INDIA: "lightgray",
  USSR: "lightgreen",
  UK: "yellow",
  USA: "lightblue",
  CHINA: "blue",
  FRANCE: "orange",
};

const stackStrategy = {
  stack: "total",
  area: true,
  stackOffset: "none",
};

const customize = {
  height: 700,
  // legend: {
  //   hidden: false,
  //   direction: "column",
  //   position: {
  //     vertical: "top",
  //     horizontal: "right",
  //   },
  // },
  margin: { top: 100 },
  stackingOrder: "descending",
};

const StackedBarChartTestPerYear = () => {
  return (
    <div>
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
              Number of Deployments Per Country Over Time
            </Typography>
          </Box>
        </Grid>
        {/* Actual Graph */}
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography
            sx={{
              mt: "50px",
              mb: "-80px",
              fontSize: "14px",
              fontFamily: "PT Mono",
            }}
          >
            Number of Test
          </Typography>
          <LineChart
            xAxis={[
              {
                dataKey: "year",
                label: "Year",
                fontFamily: "PT Mono",
                valueFormatter: (value) => {
                  value.toString();
                },
                min: 1945,
                max: 2000,
                tickLabelStyle: {
                  fontFamily: "PT Mono",
                },
                labelStyle: {
                  fontFamily: "PT Mono",
                },
              },
            ]}
            yAxis={[
              {
                // label: "Number of Tests",
                tickLabelStyle: {
                  fontFamily: "PT Mono",
                },
              },
            ]}
            series={Object.keys(keyToLabel).map((key) => ({
              dataKey: key,
              label: keyToLabel[key],
              sx: { fontFamily: "PT Mono" },
              color: colors[key],
              showMark: false,
              ...stackStrategy,
            }))}
            slotProps={{
              legend: {
                labelStyle: {
                  fontFamily: "PT Mono",
                },
                direction: "column",
                position: {
                  vertical: "top",
                  horizontal: "right",
                },
                padding: 100,
              },
            }}
            dataset={processed_nuclear_explosion_data}
            {...customize}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default StackedBarChartTestPerYear;
