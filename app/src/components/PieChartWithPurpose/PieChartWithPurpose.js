import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";
import TemporaryDrawer from "../Utilities/SideDrawer";
import ungroupedPair from "./data/p_f_pair_pregrouping.json";
import pair from "./data/purpose_frequency_pair.json";

const textFieldStyle = {
  width: "80%",
  "& .Mui-disabled": {
    fontFamily: "PT Mono",
    WebkitTextFillColor: "#212529", // Override text color for webkit browsers
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#212529", // change inner text color
    fontSize: 14,
    fontFamily: "PT Mono",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ADB5BD", // Style for outline
    },
    "&:hover fieldset": {
      borderColor: "#212529", // Style on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212529", // Style when the input is focused
    },
    "& input": {
      color: "#212529", // Style for user input
      fontSize: 15, // Font size for input
      fontFamily: "PT Mono", // Font family for input
    },
    "& textarea": {
      color: "#212529", // Style for textarea (for multiline)
      fontSize: 15, // Font size for textarea
      fontFamily: "PT Mono", // Font family for textarea
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#212529",
    fontSize: 15, // Font size for label when input is focused
    fontFamily: "PT Mono", // Font family for label when input is focused
  },
};

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
          flyoutStyle={{ fill: "#37474f", stroke: "#37474f" }}
          text={({ datum }) => `${datum.x}: ${datum.y} (times)`}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export default function PieChartWithPurpose() {
  const [group, setGroup] = useState("Grouped");
  const [transformedData, setTransformedData] = useState([]);
  const [explanation, setExplanation] = useState("");
  useEffect(() => {
    const dataToTransform = group === "Grouped" ? pair : ungroupedPair;
    const transformedData = dataToTransform.map((item, index) => ({
      x: item.purpose,
      y: item.frequency,
      z: item.explanation,
    }));
    setTransformedData(transformedData);
  }, [group]);

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  return (
    <>
      <Box p={2}>
        <TemporaryDrawer />
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", mt: -4 }}>
            <Typography
              sx={{
                fontFamily: "PT Mono",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Purpose & Frequency of Nuclear Explosions
            </Typography>
          </Box>
        </Grid>
        {/* Pie Chart */}
        <Grid item xs={6}>
          <VictoryPie
            style={{ labels: { fill: "white", fontSize: 12 } }}
            innerRadius={80}
            labelRadius={110}
            labels={({ datum }) => ``}
            labelComponent={<CustomLabel />}
            data={transformedData}
            colorScale="qualitative"
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const percentage = (
                            (props.datum.y / 2050) *
                            100
                          ).toFixed(2);
                          setExplanation(
                            `Purpose: ${props.datum.x}
                            
Explanation: ${props.datum.z}

Occurrences: ${props.datum.y} times, which accounts for ${percentage}% of all recorded nuclear explosions.`
                          );
                        },
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {
                          setExplanation("");
                        },
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </Grid>
        {/* Right Section: Toggle selection & explanation */}
        <Grid item container xs={6}>
          {/* Toggle Selection */}
          <Grid item xs={12}>
            <Box
              sx={{
                width: "80%",
                textAlign: "left",
                padding: 5,
              }}
            >
              <Typography sx={{ fontFamily: "PT Mono" }}>
                This page presents a pie chart illustrating the{" "}
                <span style={{ fontWeight: "bold" }}>
                  distribution of nuclear explosions by purpose and frequency
                </span>
                . Hovering over each segment reveals detailed information on the
                purpose, frequency, and percentage contribution to the total
                recorded detonations.
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 5,
              }}
            >
              {/* Selection button & Helper text */}
              <FormControl
                variant="standard"
                size="small"
                sx={{ fontFamily: "PT Mono" }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ fontFamily: "PT Mono" }}
                >
                  Grouping of Data
                </InputLabel>
                <Select
                  value={group}
                  label="Grouped"
                  sx={{
                    fontFamily: "PT Mono",
                    color: "black",
                  }}
                  onChange={handleChange}
                >
                  <MenuItem value={"Grouped"} sx={{ fontFamily: "PT Mono" }}>
                    Grouped
                  </MenuItem>
                  <MenuItem value={"Ungrouped"} sx={{ fontFamily: "PT Mono" }}>
                    Ungrouped
                  </MenuItem>
                </Select>
                <FormHelperText sx={{ fontFamily: "PT Mono" }}>
                  Data with mixed purpose is grouped by default for better
                  readability. <br /> Select "Ungroup" to display original data.
                </FormHelperText>
              </FormControl>
            </Box>
            <Divider></Divider>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* Explanation Window */}
            <TextField
              id="Information Box"
              label="Information Box"
              name="Information Box"
              multiline
              rows={10}
              value={
                explanation
                  ? explanation
                  : "More information will be displayed here when hovering on sections in Pie Chart."
              }
              onChange={() => {}}
              disabled
              sx={textFieldStyle}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
