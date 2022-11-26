import React, { useRef, useState, useEffect } from "react";
import { BiFilter, BiFilterAlt } from "react-icons/bi";
import { getNumBets } from "../connector/utils/getNumBets";
import { fetchAllBets } from "../connector/utils/utils";
// import Web3Modal from "web3modal";
// import { providers } from "ethers";
import { motion } from "framer-motion";
import "./styles/Bets.css";
import { BsPlayBtn } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { getProviderOrSigner } from "../connector/utils/getProviderOrSigner";

const Bets = () => {
  const [betstate, setBetState] = useState("");
  const [filterState, setFilterState] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [detailsModal, setDetailsModal] = useState("modal-container__target");
  const [filterModal, setFilterModal] = useState("modal-container__target");
  const [updateModal, setUpdateModal] = useState("modal-container__target");

  const [numBets, setNumBets] = useState("0");
  const [bets, setBets] = useState([]);
  const web3ModalRef = useRef();


  useEffect(() => {
    fetchAllBetsById();
  }, []);

  const getBets = async () => {
    const provider = await getProviderOrSigner(web3ModalRef);
    console.log("Here!!!");
    const gNom = await getNumBets(provider);
    setNumBets(gNom.toString());
  };

  const fetchAllBetsById = async() => {
    try {
      const provider = await getProviderOrSigner(web3ModalRef);
      const allBets = await fetchAllBets(provider);
      setBets(allBets);
    } catch (error) {
      console.log(error);
    }
  }


  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendDetailsValue = () => {
    setDetailsModal("modal-container__target");
  };

  const renderState = () => {
    let state;

    if (betstate == "myBets") {
      state = "myBets";
    } else {
      state = "allBets";
    }

    return state;
  };
  const handleState = (e) => {
    setBetState(e.target.value);
  };

  const renderFilterState = () => {
    let state;

    if (filterState == "betId") {
      state = "Bet Id";
    } else if (filterState == "betName") {
      state = "Bet Name";
    } else if (filterState == "creatorAddress") {
      state = "Creator's Address";
    } else {
      state = "Search";
    }

    return state;
  };

  const renderSearchType = () => {
    let type;

    if (filterState == "betId") {
      type = "number";
    } else {
      type = "text";
    }

    return type;
  };
  const sendRadioValues = () => {
    setUpdateModal("modal-container__target");
  };

  const handleFilterState = (e) => {
    setFilterState(e.target.value);
  };
  return (
    <div className="bets__container">
      <div className="bets__header">
        <h1 className="bets__h1">Available Bets</h1>
        <p className="bets__p">Here are all the Pending Bets</p>
      </div>

      <div className="bets__select">
        <div className="bets__selector">
          <div className="selector__div">
            <select
              required
              onChange={handleState}
              value={betstate}
              className="selector"
            >
              <option value="allBets" selected>
                All Bets
              </option>
              <option value="myBets">My Bets</option>
            </select>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bets__search"
        >
          <input
            type={renderSearchType()}
            required
            placeholder={renderFilterState()}
            value={inputValue}
            onChange={onInputChange}
            className="text__input__bets"
          />

          <BiFilterAlt
            className="bets__filter__icon"
            onClick={() => {
              setFilterModal("modal-container");
            }}
          />
        </form>
      </div>

      <div className={filterModal}>
        <section class="modal">
          <header class="modal-header">
            <div className="modal__info">
              <h2 class="modal-title">Filter:</h2>
              <p>
                <i>Search your bets by:</i>
              </p>
            </div>

            <span
              onClick={() => {
                setFilterModal("modal-container__target");
              }}
              class="modal-close"
            >
              Close
            </span>
          </header>
          <div class="modal-content">
            <div className="selector__div1">
              <select
                required
                onChange={handleFilterState}
                value={filterState}
                className="selector"
              >
                <option value="default" selected>
                  Search By
                </option>
                <option value="betName">Bet Name</option>
                <option value="betId">Bet Id</option>
                <option value="creatorAddress">Creator Address</option>
              </select>
            </div>
          </div>
        </section>
      </div>

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

      {renderState() == "myBets" ? (
        <>
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="table__container__history"
          >
            <div className="nft__div">
              <h1 className="nft__h1">My Bets</h1>

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

      {renderState() == "allBets" ? 
        (bets.length > 0 ?
        <>
          {bets.map((p, index) => (
            <div key={index}>
        
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="table__container__history"
          >
            <div className="t__container">
              <div className="t__cards">
                <div className="t__card">
                  <div className="t__left">
                    <div className="t__left__info">
                      <div className="subject">
                        <span>#{p.betId}</span>
                      </div>
                    </div>
                    <div className="t__left__info">
                      <div className="subject">Players:</div>
                      {
                        p.betType == 0 ?
                        <div className="value">{p.totalNOB}</div>
                        :
                        p.challengeAccepted.toString() == "false" ?
                        <div className="value">{1}</div> :
                        <div className="value">{2}</div>

                      }
                      
                    </div>
                    <div className="t__left__info">
                      <div className="subject">Executed:</div>
                      <div className="value">{p.executed.toString()}</div>
                    </div>
                    <div className="t__left__info">
                      
                      <div className="value1">
                        <FaMoneyBill />
                        <p>
                          {
                            p.betType == 0 ?
                            parseFloat(p.totalAmountBet).toFixed(3)
                            :
                            p.betAmount
                          } MATIC
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="t__right">
                    <p>{p.betType == 0 ? "Public" : "Private"}</p>
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
        
      </div>
      ))} 
      </>
      : (
        <div className="bets__header">
          <p className="bets__p">No Bets Created... Yet!</p>
        </div>
      )
       ): (
        ""
      )}

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
            <>
            {bets.map((p, index) => (
              <div key={index}>
              <div className="attribute__input">
                <div className="details__info">
                  <div className="details__values">
                    <p>Bet ID:</p>
                    <p className="value">{p.betId}</p>
                  </div>

                  <div className="details__values">
                    <p>Deadline:</p>
                    <p className="value">{p.deadline.toLocaleString()}</p>
                  </div>

                  <div className="details__values">
                    <p>Bet Master:</p>
                    <p className="value">{p.betMaster}</p>
                  </div>

                  <div className="details__values">
                    <p>Bet Event:</p>
                    <p className="value">{p.eventName}</p>
                  </div>

                  <div className="details__values">
                    <p>Bet Type:</p>
                    <p className="value">{p.betType == 0 ? "Public" : "Private"}</p>
                  </div>

                  { 
                    p.betType == 0 ? "" :
                    <div className="details__values">
                      <p>Bet Price:</p>
                      <p className="value">{p.betAmount}</p>
                    </div>
                  }

                  {
                    p.betType == 0 ?
                    <>
                      <div className="details__values">
                        <p>First Outcome:</p>
                        <p className="value">{p.outcomeOne}</p>
                      </div>

                      <div className="details__values">
                        <p>Second Outcome:</p>
                        <p className="value">{p.outcomeTwo}</p>
                      </div>

                      {
                        p.totalNumChoices == 2 ? "" :
                        p.totalNumChoices == 3 ?
                          <div className="details__values">
                            <p>Third Outcome:</p>
                            <p className="value">{p.outcomeThree}</p>
                          </div>
                        : <>
                          <div className="details__values">
                            <p>Third Outcome:</p>
                            <p className="value">{p.outcomeThree}</p>
                          </div>
                          <div className="details__values">
                            <p>Fourth Outcome:</p>
                            <p className="value">{p.outcomeFour}</p>
                        </div>
                        </>
                      }
                      

                      <div className="details__values">
                        <p>First Odd:</p>
                        <p className="value">{parseFloat(p.finalOddOne).toFixed(4)}</p>
                      </div>

                      <div className="details__values">
                        <p>Second Odds:</p>
                        <p className="value">{parseFloat(p.finalOddTwo).toFixed(4)}</p>
                      </div>

                      {
                        p.totalNumChoices == 2 ? "" :
                        p.totalNumChoices == 3 ?
                        <div className="details__values">
                          <p>Third Odd:</p>
                          <p className="value">{parseFloat(p.finalOddThree).toFixed(4)}</p>
                        </div>
                        :
                        <>
                          <div className="details__values">
                            <p>Third Odd:</p>
                            <p className="value">{parseFloat(p.finalOddThree).toFixed(4)}</p>
                          </div>
                          <div className="details__values">
                            <p>Fourth Odd:</p>
                            <p className="value">{parseFloat(p.finalOddFour).toFixed(4)}</p>
                          </div>
                        </>
                      }

                      <div className="details__values">
                        <p>Total Bets Placed:</p>
                        <p className="value">{p.totalNOB}</p>
                      </div>

                      <div className="details__values">
                        <p>Total Amount Bet:</p>
                        <p className="value">{parseFloat(p.totalAmountBet).toFixed(3)} Matic</p>
                      </div>
                    </>
                    :
                    <>
                      <div className="details__values">
                        <p>First Outcome:</p>
                        <p className="value">{p.privateFirstChoice}</p>
                      </div>

                      <div className="details__values">
                        <p>Second Outcome:</p>
                        <p className="value">{p.privateSecondChoice}</p>
                      </div>

                      <div className="details__values">
                        <p>Challenger Address:</p>
                        <p className="value">{p.opponentAddress}</p>
                      </div>

                      <div className="details__values">
                        <p>Challenge Accepted:</p>
                        <p className="value">{p.challengeAccepted.toString()}</p>
                      </div>

                      <div className="details__values">
                        <p>Bet Active:</p>
                        <p className="value">{p.active.toString()}</p>
                      </div>
                    </>
                  }


                  <div className="details__values">
                    <p>Correct Outcome:</p>
                    <p className="value">
                      {
                        p.corrChoice == 0 ? "N/A" :(
                          p.corrChoice == 1 ? p.outcomeOne : (
                          p.corrChoice == 2 ? p.outcomeTwo : (
                            p.corrChoice == 3 ? p.outcomeThree : p.outcomeFour
                          )
                        )
                        )
                      }
                    </p>
                  </div>

                  <div className="details__values">
                    <p>Executed:</p>
                    <p className="value">{p.executed.toString()}</p>
                  </div>
                </div>
              </div>
              </div>))}</>
            </form>
          </div>
        </section>
      </div>
      <div>
        <button onClick={getBets}>Get Num Bets</button>
        <p>Num of Bets: {numBets} </p>
      </div>
    </div>
  );
};

export default Bets;
