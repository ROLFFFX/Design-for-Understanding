import React from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";
import pair from "./data/purpose_frequency_pair.json";
import { Grid } from "@mui/material";

class CustomLabel extends React.Component {
  render() {
    return (
      <g>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          x={200}
          y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{ fill: "black" }}
          text={({ datum }) => `${datum.x}: ${datum.y}`}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export default function PieChartWithPurpose() {
  const transformedData = pair.map((item, index) => ({
    x: item.purpose,
    y: item.frequency,
    z: item.explanation,
  }));

  return (
    // <Grid container xs={12}>
    <VictoryPie
      style={{ labels: { fill: "white" } }}
      innerRadius={80}
      labelRadius={110}
      labels={({ datum }) => ``}
      labelComponent={<CustomLabel />}
      data={transformedData}
    />
    // </Grid>
  );
}
