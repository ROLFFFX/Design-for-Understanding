import React from "react";
import VegaDemo from "./components/VegaDemo.js";
import { Outlet, outlet, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import PageNotFound from "./components/PageNotFound.js";

function Layout({ children }) {
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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vegademo" element={<VegaDemo />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {/* <VegaDemo /> */}
    </>
  );
};

export default App;
