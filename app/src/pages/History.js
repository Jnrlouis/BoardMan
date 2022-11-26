import React, { useState, useEffect } from "react";
import "./styles/History.css";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  BsFileEarmarkText,
  BsPeopleFill,
  BsPersonCheckFill,
} from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import { ImFilesEmpty } from "react-icons/im";
import { GrDriveCage } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { RiFolderReceivedLine } from "react-icons/ri";
import { GiPinata } from "react-icons/gi";
import { ethers } from "ethers";

const History = () => {
  const [detailsModal, setDetailsModal] = useState("modal-container__target");

  const [updateModal, setUpdateModal] = useState("modal-container__target");

  const [account, setAccount] = useState("0xgfgfy56565b55jj");
  const [raffleAddress, setRaffleAddress] = useState("0xgfgfy56565b55jj");
  const [my_Tx, setMy_Tx] = useState([]);
  const [historyState, setHistoryState] = useState("pick");
  const [inputValue, setInputValue] = useState("");
  const [inputValueAdd, setInputValueAdd] = useState("");

  const [state, setState] = useState(false);

  const handleState = (e) => {
    setHistoryState(e.target.value);
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onInputChangeAdd = (event) => {
    const { value } = event.target;
    setInputValueAdd(value);
  };
  const sendRadioValues = () => {
    setUpdateModal("modal-container__target");
  };

  const sendDetailsValue = () => {
    setDetailsModal("modal-container__target");
  };
  const renderClass = () => {
    let result;
    historyState == "pick"
      ? (result = "closed__display")
      : (result = "history__service__info");

    return result;
  };

  const renderState = () => {
    let state;

    if (historyState == "createdBet") {
      state = "createdBet";
    } else if (historyState == "joinBet") {
      state = "joinBet";
    } else if (historyState == "betWon") {
      state = "betWon";
    } else if (historyState == "betLoss") {
      state = "betLoss";
    } else if (historyState == "stats") {
      state = "stats";
    } else if (historyState == "mintTransactions") {
      state = "mintTransactions";
    } else {
      state = "pick";
    }

    return state;
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="history__container">
        <div className="history__header">
          <h1 className="history__h1">History</h1>
          <p className="history__p">Browse through your History</p>
        </div>

        <div className="history__selector">
          <div className="selector__div">
            <select
              onChange={handleState}
              value={historyState}
              className="selector"
            >
              <option value="pick" selected>
                Select History Data
              </option>
              <option value="createdBet">Created Bets</option>
              <option value="joinBet">Bets Joined</option>
              <option value="betWon">Bets Won</option>
              <option value="betLoss">Bets Lost</option>
              <option value="stats">Stats</option>
              <option value="mintTransactions">Bet Transactions</option>
            </select>
          </div>
        </div>
        {renderState() == "pick" ? (
          <div>Select the History Data you want to view</div>
        ) : (
          ""
        )}

        <div className={updateModal}>
          <section class="modal">
            <header class="modal-header">
              <div className="modal__info">
                <h2 class="modal-title">
                  Provide the index of the correct option:
                </h2>
                <p>
                  <i>
                    Note: Please do well not to <br /> provide false information{" "}
                    <br />
                    as the correct option
                  </i>
                </p>
              </div>

              <span
                onClick={() => {
                  setUpdateModal("modal-container__target");
                }}
                class="modal-close"
              >
                Close
              </span>
            </header>
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendRadioValues();
                }}
                className="attribute__div"
              >
                <div className="attribute__input">
                  <div className="radio__div">
                    <div className="radio__info">
                      <input type="radio" id="age1" name="age" value="0" />
                      <label for="0">index 0</label>
                    </div>

                    <div className="radio__info">
                      <input type="radio" id="age2" name="age" value="1" />
                      <label for="1">index 1</label>
                    </div>

                    <div className="radio__info">
                      <input type="radio" id="age3" name="age" value="2" />
                      <label for="2">index 2</label>
                    </div>
                  </div>
                </div>
                <div className="attribute__button__div">
                  <button className="attribute__button">Update</button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <div className={detailsModal}>
          <section class="modal">
            <header class="modal-header">
              <div className="modal__info">
                <h2 class="modal-title">Bet Details:</h2>
              </div>

              <span
                onClick={() => {
                  setDetailsModal("modal-container__target");
                }}
                class="modal-close"
              >
                Close
              </span>
            </header>
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendDetailsValue();
                }}
                className="attribute__div"
              >
                <div className="attribute__input">
                  <div className="details__info">
                    <div className="details__values">
                      <p>Bet ID:</p>
                      <p className="value">0</p>
                    </div>

                    <div className="details__values">
                      <p>Deadline:</p>
                      <p className="value">9/6/2022, 1:40:00 AM</p>
                    </div>

                    <div className="details__values">
                      <p>Bet Master:</p>
                      <p className="value">0x574E...TY677</p>
                    </div>

                    <div className="details__values">
                      <p>Bet Event:</p>
                      <p className="value">BEST ANIME CHARACTER</p>
                    </div>

                    <div className="details__values">
                      <p>Bet Price:</p>
                      <p className="value">50 MATIC</p>
                    </div>

                    <div className="details__values">
                      <p>First Outcome:</p>
                      <p className="value">GOKU</p>
                    </div>

                    <div className="details__values">
                      <p>Second Outcome:</p>
                      <p className="value">NARUTO</p>
                    </div>

                    <div className="details__values">
                      <p>Third Outcome:</p>
                      <p className="value">Ichigo</p>
                    </div>

                    <div className="details__values">
                      <p>First Odd:</p>
                      <p className="value">1.3456</p>
                    </div>

                    <div className="details__values">
                      <p>Second Odds:</p>
                      <p className="value">1.5678</p>
                    </div>

                    <div className="details__values">
                      <p>Third Odd:</p>
                      <p className="value">1.6789</p>
                    </div>

                    <div className="details__values">
                      <p>Total Bets Placed:</p>
                      <p className="value">7</p>
                    </div>

                    <div className="details__values">
                      <p>Total Amount Bet:</p>
                      <p className="value">120 Matic</p>
                    </div>

                    <div className="details__values">
                      <p>Correct Choice:</p>
                      <p className="value">??</p>
                    </div>

                    <div className="details__values">
                      <p>Executed:</p>
                      <p className="value">False</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>

        {renderState() == "createdBet" ? (
          <>
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="table__container__history"
            >
              <div className="nft__div">
                <h1 className="nft__h1">Bets Created</h1>

                <div className="t__cards">
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">122</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">False</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#012</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>45MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>3 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button
                        className="btn2"
                        onClick={() => {
                          setUpdateModal("modal-container");
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          ""
        )}

        {renderState() == "joinBet" ? (
          <>
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="table__container__history"
            >
              <div className="history__service__header">
                <h1 className="history__service__h1">Bets Join</h1>
              </div>
              <div className="t__container">
                <div className="t__cards">
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>

                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          ""
        )}

        {renderState() == "betWon" ? (
          <>
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="table__container__history"
            >
              <div className="history__service__header">
                <h1 className="history__service__h1">Bets Won</h1>
              </div>
              <div className="t__container">
                <div className="t__cards">
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>

                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          ""
        )}

        {renderState() == "betLoss" ? (
          <>
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="table__container__history"
            >
              <div className="history__service__header">
                <h1 className="history__service__h1">Bets Loss</h1>
              </div>
              <div className="t__container">
                <div className="t__cards">
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>

                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                  <div className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">Players:</div>
                        <div className="value">115</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">Executed:</div>
                        <div className="value">True</div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          Id: <span>#022</span>
                        </div>
                        <div className="value1">
                          <FaMoneyBill />
                          <p>100MATIC</p>
                        </div>
                      </div>
                    </div>
                    <div className="t__right">
                      <p>27 hours</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                        }}
                      >
                        Details
                      </button>
                      <button className="btn2">Enter</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          ""
        )}

        {renderState() == "stats" ? (
          <>
            <div className="stats__history">
              <div className="history__service__header">
                <h1 className="history__service__h1">My Information</h1>
              </div>

              <motion.div
                className="history__cards"
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="history__card">
                  <span className="history__profile">
                    <AiOutlineUser className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>
                    <p className="history__name"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <ImFilesEmpty className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__no__files"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <GrDriveCage className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <FiSend className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <RiFolderReceivedLine className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <BsPeopleFill className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">NFTs</span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <GiPinata className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <BsFileEarmarkText className="history__pic" />
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>

                <div className="history__card">
                  <span className="history__profile">
                    <p className="history__pic">I</p>
                  </span>

                  <div className="history__info">
                    <p className="history__address">
                      {`Address: ${account.slice(0, 10)}...
                                                            ${account.slice(
                                                              account.length - 5
                                                            )}`}
                    </p>

                    <p className="history__total__space"></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          ""
        )}

        {renderState() == "mintTransactions" ? (
          <>
            <motion.div
              whileInView={{ x: [-100, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="table__container__history"
            >
              <div className="history__service__header">
                <h1 className="history__service__h1">Transactions</h1>
              </div>

              <table className="table">
                <thead className="thead">
                  <tr className="tr">
                    <th>TO</th>
                    <th>FROM</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="ADDRESS TO">
                      <div className="component">
                        {raffleAddress.slice(0, 10)}
                        ...
                        {raffleAddress.slice(raffleAddress.length - 4)}
                      </div>
                    </td>
                    <td data-label="ADDRESS FROM">
                      <div className="component">
                        {account.slice(0, 10)}
                        ...
                        {account.slice(account.length - 4)}
                      </div>
                    </td>

                    <td data-label="AMOUNT">3 MATIC</td>
                    <td data-label="DATE">
                      {new Date(118900 * 1000).toDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default History;
