import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";

// import { ConnectButton } from "web3uikit";
import "./Header.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="Navbar">
      <span className="nav-logo">
        <div className="moralis">
          <ConnectButton />
          <BiHelpCircle onClick={() => navigate("help")} className="help" />
          {/* <ConnectButton moralisAuth={false} /> */}
        </div>
      </span>

      <div className={`nav-items ${isOpen && "open"}`}>
        <NavLink onClick={handleClick} to="/">
          Home
        </NavLink>
        <NavLink onClick={handleClick} to="/createBet">
          Create Bet
        </NavLink>
        <NavLink onClick={handleClick} to="/bets">
          Bets
        </NavLink>

        <NavLink onClick={handleClick} to="/history">
          Bet History
        </NavLink>
        <NavLink onClick={handleClick} to="/team">
          Team
        </NavLink>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Header;
