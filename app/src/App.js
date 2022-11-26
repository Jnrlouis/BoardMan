import "./App.css";
import React, { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";
import { getNumBets } from "./connector/utils/getNumBets";
import Web3Modal from "web3modal";
import { providers } from "ethers";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Bets from "./pages/Bets";
import History from "./pages/History";
import Team from "./pages/Team";
import Help from "./pages/Help";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createBet" element={<CreateBet />} />
        <Route path="/bets" element={<Bets />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
        <Route path="/help" element={<Help />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
