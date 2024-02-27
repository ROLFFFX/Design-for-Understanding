import { Grid } from "@mui/material";
import React from "react";
import PieChartWithPurpose from "../components/PieChartWithPurpose/PieChartWithPurpose";

export default function PieChartPage() {
  return (
    <>
      <Grid container xs={12}>
        <PieChartWithPurpose />
      </Grid>
    </>
  );
}
