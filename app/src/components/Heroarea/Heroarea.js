import React, { useState, useEffect, useRef } from "react";
import "./Heroarea.css";

import bet7 from "../../assets/bet7.jpg";
import bet8 from "../../assets/bet8.jpg";
import bet9 from "../../assets/bet9.jpg";
import bet10 from "../../assets/bet10.webp";
import bet11 from "../../assets/bet11.webp";

import TypeWriter from "typewriter-effect";

import { useNavigate } from "react-router-dom";

const images = [bet10, bet7, bet8, bet9, bet11];
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FFBB28", "#FFBB28"];

const Heroarea = () => {
  const navigate = useNavigate();

  const delay = 2500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div id="HeroArea" className="heroarea__container">
      <div className="con1">
        <div className="heroarea__info">
          <div className="heroarea__header">
            <h1 className="heroarea__h1">Welcome to Master Bet</h1>
            <p className="heroarea__p">
              <TypeWriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  strings: [
                    "Create your own Bet Events",
                    "Bet on everything and anything and win big",
                    "Share the Event with your firends to bet on",
                    "Engage in Private bets with your friends",
                  ],
                }}
              />
            </p>
          </div>

          <div className="enterbutton__div__heroarea">
            <button
              onClick={() => navigate("createBet")}
              className="enter__button__heroarea"
            >
              <span className="button__text">Create Bet</span>
            </button>
            <button
              onClick={() => navigate("bets")}
              className="enter__button__heroarea"
            >
              <span className="button__text">View Bet</span>
            </button>
          </div>
        </div>
        <div className="heroarea__img">
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {images.map((image, index) => (
                <div className="slide" key={index}>
                  <img src={image} alt="nftImage" className="nft" />
                </div>
              ))}
            </div>

            {/* <div className="slideshowDots">
            {colors.map((_, idx) => (
              <div
                key={idx}
                className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}
              ></div>
            ))}
          </div> */}
          </div>
        </div>
      </div>

      <div className="con2">
        <p>
          Master Bet is a decentralized betting platform, where users can create
          their own custom bet, for the public to stake and gain from the bet.
          Private bets can also be created for two people to bet and stake their
          money with a decentralized system.
        </p>
      </div>
    </div>
  );
};

export default Heroarea;
