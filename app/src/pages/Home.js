import React from "react";
import Cta from "../components/Cta/Cta";

import Heroarea from "../components/Heroarea/Heroarea";
import HistoryCta from "../components/HistoryCta/HistoryCta";
import Join from "../components/Join/Join";
import Trending from "../components/Trending/Trending";

import "./styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <Heroarea />
      <Trending />
      <Join />
      <Cta />
      <HistoryCta />
    </div>
  );
};

export default Home;
