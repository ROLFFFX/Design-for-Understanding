import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryPortal,
  VictoryScatter,
  VictoryStack,
} from "victory";
import TemporaryDrawer from "../Utilities/SideDrawer";
import { Grid } from "@mui/material";

const StackedBarChartTestPerYear = () => {
  return (
    <div>
      <TemporaryDrawer />
      <Grid container>
        <VictoryChart scale={{ x: "time" }} width={400} height={400}>
          <VictoryStack colorScale="warm">
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 2 },
                { x: new Date(1996, 1, 1), y: 3 },
                { x: new Date(2006, 1, 1), y: 5 },
                { x: new Date(2016, 1, 1), y: 4 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 4 },
                { x: new Date(1996, 1, 1), y: 3 },
                { x: new Date(2006, 1, 1), y: 2 },
                { x: new Date(2016, 1, 1), y: 5 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: new Date(1986, 1, 1), y: 3 },
                { x: new Date(1996, 1, 1), y: 1 },
                { x: new Date(2006, 1, 1), y: 4 },
                { x: new Date(2016, 1, 1), y: 2 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
          </VictoryStack>
        </VictoryChart>
      </Grid>
    </div>
  );
};

export default StackedBarChartTestPerYear;
