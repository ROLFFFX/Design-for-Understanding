import React from "react";
import VegaDemo from "./components/VegaDemo.js";
import { outlet, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <VegaDemo />
    </>
  );
};

export default App;
