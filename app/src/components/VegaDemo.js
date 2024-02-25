import { Grid } from "@mui/material";
import { useEffect } from "react";
import vegaEmbed from "vega-embed";
import data from "../nuclear_explosions.json";
import PieChartWithPurpose from "./PieChartWithPurpose/PieChartWithPurpose";

const customGridStyle = {
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function VegaDemo() {
  useEffect(() => {
    const surfaceMagnitudes = data
      .map((d) => ({ Surface: d.Data.Magnitude.Surface }))
      .filter((d) => d.Surface > 0); // Filter out entries with 0.0, assuming they're placeholders

    const depthBodyData = data.map((d) => ({
      Upper: d.Data.Yield.Upper,
      Body: d.Data.Magnitude.Body,
    }));
    //.filter(d => d.Body > 0 && d.Upper > 0);

    const yieldUpper = data
      .map((d) => ({ Upper: d.Data.Yield.Upper }))
      .filter((d) => d.Upper > 0);

    const specSurface = {
      description: "Histogram of Nuclear Explosion Surface Magnitudes",
      data: {
        values: surfaceMagnitudes,
      },
      mark: "bar",
      encoding: {
        x: {
          field: "Surface",
          bin: true,
          title: "Surface Magnitude",
        },
        y: {
          aggregate: "count",
          title: "Frequency",
        },
      },
      tooltip: [{ field: "Surface", type: "quantitative" }],
    };

    const specBody = {
      description:
        "Scatter plot of Nuclear Explosion Body Magnitudes vs. Depth",
      data: {
        values: depthBodyData,
      },
      mark: "point",
      encoding: {
        x: {
          field: "Body",
          type: "quantitative",
          title: "Upper Bound",
        },
        y: {
          field: "Upper",
          type: "quantitative",
          title: "Body Magnitude",
        },
      },
      tooltip: [
        { field: "Upper", type: "quantitative" },
        { field: "Body", type: "quantitative" },
      ],
    };

    const specUpper = {
      description:
        "Histogram of Explosion yield upper estimate in kilotons of TNT",
      data: {
        values: yieldUpper,
      },
      mark: "bar",
      encoding: {
        x: {
          field: "Upper",
          bin: true,
          title: "Explosion yield upper estimate in kilotons of TNT",
        },
        y: {
          aggregate: "count",
          title: "Frequency",
        },
      },
      tooltip: [{ field: "Upper", type: "quantitative" }],
    };

    // Embed the first graph
    vegaEmbed("#surface-magnitude", specSurface, { actions: true });

    // Embed the modified second graph for Depth vs. Body Magnitude
    vegaEmbed("#body-magnitude", specBody, { actions: true });

    // Embed the third graph
    vegaEmbed("#explosion-yield", specUpper, { actions: true });
  }, []);
  return (
    <div className="root">
      {/* Assuming a 4x4 grid */}
      <Grid container>
        <Grid item xs={6} sx={customGridStyle}>
          <div id="surface-magnitude"></div>
        </Grid>
        <Grid item xs={6} sx={customGridStyle}>
          <div id="body-magnitude"></div>
        </Grid>
        <Grid item xs={6} sx={customGridStyle}>
          <div id="explosion-yield"></div>
        </Grid>
        <Grid item xs={6} sx={customGridStyle}>
          <PieChartWithPurpose />
        </Grid>
      </Grid>
      {/* more graphs */}
    </div>
  );
}
