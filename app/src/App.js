import "./App.css";
import React, { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Bets from "./pages/Bets";
import History from "./pages/History";
import Team from "./pages/Team";
import Help from "./pages/Help";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import Contact from "./pages/Contact";

function App() {
  const tawkMessengerRef = useRef();
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
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <TawkMessengerReact
        propertyId={`${process.env.REACT_APP_TAWK_PROJECT_ID}`}
        widgetId={`${process.env.REACT_APP_TAWK_WIDGET_ID}`}
        ref={tawkMessengerRef}
      />

      <Footer />
    </div>
  );
}

export default App;
