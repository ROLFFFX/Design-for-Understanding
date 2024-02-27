import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant={"outlined"}
        color="inherit"
        sx={{ fontFamily: "Inter" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </>
  );
}
