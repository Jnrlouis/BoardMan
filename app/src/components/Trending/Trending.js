import React from "react";
import { BsPlayBtn } from "react-icons/bs";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const navigate = useNavigate();
  return (
    <div className="t__container">
      <div className="t__h1">
        <p>Trending Bets</p>
        <p onClick={() => navigate("bets")} className="h1__p1">
          View All
        </p>
      </div>
      <div className="t__cards">
        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">No of entries:</div>
              <div className="value">115</div>
            </div>
            <div className="t__left__info">
              <div className="subject">Expires in:</div>
              <div className="value">3 hours</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                By: <span>#15D32</span>
              </div>
              <div className="value1">
                <BsPlayBtn />
                <p>49:30</p>
              </div>
            </div>
          </div>
          <div className="t__right">
            <p>1.3 odds</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">No of entries:</div>
              <div className="value">115</div>
            </div>
            <div className="t__left__info">
              <div className="subject">Expires in:</div>
              <div className="value">3 hours</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                By: <span>#15D32</span>
              </div>
              <div className="value1">
                <BsPlayBtn />
                <p>49:30</p>
              </div>
            </div>
          </div>
          <div className="t__right">
            <p>1.3 odds</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">No of entries:</div>
              <div className="value">115</div>
            </div>
            <div className="t__left__info">
              <div className="subject">Expires in:</div>
              <div className="value">3 hours</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                By: <span>#15D32</span>
              </div>
              <div className="value1">
                <BsPlayBtn />
                <p>49:30</p>
              </div>
            </div>
          </div>
          <div className="t__right">
            <p>1.3 odds</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">No of entries:</div>
              <div className="value">115</div>
            </div>
            <div className="t__left__info">
              <div className="subject">Expires in:</div>
              <div className="value">3 hours</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                By: <span>#15D32</span>
              </div>
              <div className="value1">
                <BsPlayBtn />
                <p>49:30</p>
              </div>
            </div>
          </div>
          <div className="t__right">
            <p>1.3 odds</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
