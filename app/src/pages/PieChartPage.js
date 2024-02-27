import React from "react";
import PieChartWithPurpose from "../components/PieChartWithPurpose/PieChartWithPurpose";
import { Grid } from "@mui/material";
import HomeButton from "../components/Utilities/HomeButton";

export default function PieChartPage() {
  return (
    <>
      {/* <div>this is pie chart page</div> */}
      <HomeButton />
      <Grid container xs={12}>
        <Grid item xs={6}>
          <PieChartWithPurpose />
        </Grid>
      </Grid>
    </>
  );
}
