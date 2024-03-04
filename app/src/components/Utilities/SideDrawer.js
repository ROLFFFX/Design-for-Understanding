import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const ListItemTextStyle = {
  "& .MuiListItemText-primary": {
    fontFamily: "PT Mono",
    fontSize: 15,
  },
};

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* First Item: Button to HOME PAGE */}
        <ListItem key={"Home Page"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemText primary={"Home Page"} sx={ListItemTextStyle} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Pie Chart Purpose"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/piechartpurpose");
            }}
          >
            <ListItemText
              primary={"Purpose & Frequency"}
              sx={ListItemTextStyle}
            />
          </ListItemButton>
        </ListItem>
        {/* Third Item: Stacked Bar Chart */}
        <ListItem key={"Stacked Bar Chart"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/stackedbarchart");
            }}
          >
            <ListItemText
              primary={"Deployments Per Country"}
              sx={ListItemTextStyle}
            />
          </ListItemButton>
        </ListItem>
        {/* Forth Item: histogram, total yields / country */}
        <ListItem key={"Histogram Yield"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/histogramyield");
            }}
          >
            <ListItemText
              primary={"Total Yield Per Country"}
              sx={ListItemTextStyle}
            />
          </ListItemButton>
        </ListItem>
        {/* Fifth: Persuasion one: */}
        <ListItem key={"Persuasion One"} disablePadding>
          <ListItemButton
            onClick={() => {
              window.location.href = "http://18.224.71.121/";
            }}
          >
            <ListItemText
              primary={"Geospatial Multi-View"}
              sx={ListItemTextStyle}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button
        variant={"outlined"}
        color="inherit"
        sx={{ fontFamily: "PT Mono" }}
        onClick={toggleDrawer(true)}
      >
        Side Bar
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
