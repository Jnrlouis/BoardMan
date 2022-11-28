import React from "react";
import { BsPlayBtn } from "react-icons/bs";
import "./Trending.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

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
              <div className="subject">
                <span>#3</span>
              </div>
            </div>
            <div className="t__left__info">
              <div className="subject">0 Players</div>
            </div>
            <div className="t__left__info">
              <div className="subject">OPEN</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                <div className="value1">
                  <div className="value1">
                    <FaMoneyBill />
                    <p>5 MATIC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="t__center">
            <IoIosPeople className="state__logo" />
          </div>
          <div className="t__right">
            <p>Public</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">
                <span>#3</span>
              </div>
            </div>
            <div className="t__left__info">
              <div className="subject">0 Players</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                <div className="value1">
                  <div className="value1">
                    <FaMoneyBill />
                    <p>5 MATIC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="t__center">
            <IoIosPeople className="state__logo" />
          </div>
          <div className="t__right">
            <p>Public</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">
                <span>#3</span>
              </div>
            </div>
            <div className="t__left__info">
              <div className="subject">0 Players</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                <div className="value1">
                  <div className="value1">
                    <FaMoneyBill />
                    <p>5 MATIC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="t__center">
            <IoIosPeople className="state__logo" />
          </div>
          <div className="t__right">
            <p>Public</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>

        <div className="t__card">
          <div className="t__left">
            <div className="t__left__info">
              <div className="subject">
                <span>#3</span>
              </div>
            </div>
            <div className="t__left__info">
              <div className="subject">0 Players</div>
            </div>
            <div className="t__left__info">
              <div className="subject">
                <div className="value1">
                  <div className="value1">
                    <FaMoneyBill />
                    <p>5 MATIC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="t__center">
            <IoIosPeople className="state__logo" />
          </div>
          <div className="t__right">
            <p>Public</p>
            <button className="btn1">Details</button>
            <button className="btn2">Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
