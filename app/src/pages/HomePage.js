import { Box } from "@mui/material";
import React from "react";
import TemporaryDrawer from "../components/Utilities/SideDrawer";

export default function HomePage() {
  return (
    <div>
      <TemporaryDrawer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div></div>
      </Box>
    </div>
  );
}
