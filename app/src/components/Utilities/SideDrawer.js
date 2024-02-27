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
            <ListItemText
              primary={"Home Page"}
              sx={{
                "& .MuiListItemText0primary": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        {/* Second Item: Button to VegaDemo */}
        <ListItem key={"Home Page"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/vegademo");
            }}
          >
            <ListItemText
              primary={"Vega Demo"}
              sx={{
                "& .MuiListItemText0primary": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        {/* Third Item: Button to PieChart */}
        <ListItem key={"Pie Chart Purpose"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/piechartpurpose");
            }}
          >
            <ListItemText
              primary={"Pie Chart Purpose"}
              sx={{
                "& .MuiListItemText0primary": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                },
              }}
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
        sx={{ fontFamily: "Inter" }}
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
