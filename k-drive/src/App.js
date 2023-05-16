import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { useStateContext } from "./Context/index";

const App = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default App;
