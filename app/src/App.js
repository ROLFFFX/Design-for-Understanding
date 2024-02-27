import React from "react";
import VegaDemo from "./pages/VegaDemo.js";
import { Outlet, outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import PageNotFound from "./pages/PageNotFound.js";
import PieChartPage from "./pages/PieChartPage.js";

// Awaiting persistent components like nav bars
function CustomLayout({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vegademo" element={<VegaDemo />} />
          <Route path="/piechartpurpose" element={<PieChartPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {/* <VegaDemo /> */}
    </>
  );
};

export default App;
