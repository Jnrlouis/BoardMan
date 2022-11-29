import React, { useRef, useState, useEffect } from "react";
import { BiFilter, BiFilterAlt } from "react-icons/bi";
import { getNumBets } from "../connector/utils/getNumBets";
import { fetchAllBets, fetchAllMyBets, getChallengeAccepted, checkActive, checkExecuted} from "../connector/utils/utils";

import { motion } from "framer-motion";
import "./styles/Bets.css";
import { BsFillPersonFill, BsPlayBtn, BsSearch } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { getProviderOrSigner } from "../connector/utils/getProviderOrSigner";
import {placeBet, acceptChallenge, recallChallenge} from "../connector/placeBet.Conn.js"
import {claimPayout, claimPayoutBetMaster, claimPayoutPrivate} from "../connector/claimPayout.Conn.js";
import {executeBet, executePrivateBet} from "../connector/executeBet.Conn.js";
import { IoIosPeople, IoMdPeople } from "react-icons/io";
import Loader from "../constants/Loader/Loader";
import { useAccount } from "wagmi";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bets = () => {
  const [betstate, setBetState] = useState("");
  const [filterState, setFilterState] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [detailsModal, setDetailsModal] = useState("modal-container__target");
  const [filterModal, setFilterModal] = useState("modal-container__target");
  const [updateModal, setUpdateModal] = useState("modal-container__target");
  const [enterModal, setEnterModal] = useState("modal-container__target");

  const [numBets, setNumBets] = useState("0");
  const [correctChoice, setCorrectChoice] = useState("0");
  const [usersChoice, setUsersChoice] = useState("0");
  const [bets, setBets] = useState([]);
  const [myBets, setMyBets] = useState([]);
  const [betStake, setBetStake] = useState("0");
  const [betDetails, setBetDetails] = useState([]);
  const web3ModalRef = useRef();

  const address = useAccount().address;

  console.log(address);

  useEffect(() => {
    fetchAllBetsById();
    fetchAllMyBetsById();
  }, [address]);

  const getBets = async () => {
    const provider = await getProviderOrSigner(web3ModalRef);
    const gNom = await getNumBets(provider);
    setNumBets(gNom.toString());
  };

  const fetchAllBetsById = async () => {
    try {
      const provider = await getProviderOrSigner(web3ModalRef);
      const allBets = await fetchAllBets(provider);
      setBets(allBets);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const fetchAllMyBetsById = async () => {
    try {
      const provider = await getProviderOrSigner(web3ModalRef);
      const myBet = await fetchAllMyBets(provider, address);
      setMyBets(myBet);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const fetchBetsById = async (index) => {
    let theBets = [];
    theBets.push(bets[index]);
    setBetDetails(theBets);
  };

  const placeBetContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    await placeBet(signer, _betId.toString(), usersChoice, betStake);
  }

  const placePrivateBetContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const accepted = await getChallengeAccepted(signer, _betId);
    console.log("Accepted?: ", accepted);
    if (accepted) {
      toast.warning("Challenge Already Accepted");
    } else {
      await acceptChallenge(signer, _betId.toString());
    }
    
  }

  const recallChallengeContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const accepted = await getChallengeAccepted(signer, _betId);
    const isActive = await checkActive(signer, _betId);
    if (accepted) {
      toast.warning("Challenge Already Accepted");
    } else if (!isActive) {
      toast.warning("Bet Event Inactive");
    } else{
      await recallChallenge(signer, _betId.toString());
    }
    
  }

  const executeBetContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    await executeBet(signer, _betId.toString(), correctChoice);
  }

  const executePrivateBetContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const accepted = await getChallengeAccepted(signer, _betId);
    if (!accepted) {
      toast.warning("Challenge was not accepted")
    } else {
      await executePrivateBet(signer, _betId, correctChoice);
    }  
  }

  const claimPayoutContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const isExecuted = await checkExecuted(signer, _betId);
    if (!isExecuted) {
      toast.warning("Bet Event NOT Executed")
    } else {
      await claimPayout(signer, _betId);
    }  
  }

  const claimPayoutBetMasterContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const isExecuted = await checkExecuted(signer, _betId);
    if (!isExecuted) {
      toast.warning("Bet Event NOT Executed")
    } else {
      await claimPayoutBetMaster(signer, _betId);
    }  
  }

  const claimPayoutPrivateContract = async(_betId) => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    const accepted = await getChallengeAccepted(signer, _betId);
    const isActive = await checkActive(signer, _betId);
    const isExecuted = await checkExecuted(signer, _betId);
    if (!isExecuted) {
      toast.warning("Bet Event NOT Executed")
    } else if (!accepted) {
      toast.warning("Challenge was not accepted")
    } else if (!isActive) {
      toast.warning("Bet Event Inactive")
    } else {
      await claimPayoutPrivate(signer, _betId);
    }  
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onBetAmountChange = (event) => {
    const { value } = event.target;
    setBetAmount(value);
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

  const sendEnterRadioValues = () => {
    setEnterModal("modal-container__target");
  };

  const handleFilterState = (e) => {
    setFilterState(e.target.value);
  };
  return (
    <div className="bets__container">
      <ToastContainer/>
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
          <BiFilterAlt
            className="bets__filter__icon"
            onClick={() => {
              setFilterModal("modal-container");
            }}
          />
          <input
            type={renderSearchType()}
            required
            placeholder={renderFilterState()}
            value={inputValue}
            onChange={onInputChange}
            className="text__input__bets"
          />
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {" "}
            <BsSearch
              style={{ color: "var(--border-color)", fontSize: "17px" }}
            />
          </button>
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
                  Note: Please do well not to provide <br />
                  false information{" "} as the
                  <br />
                  correct option as you would lose
                  <br />
                  integrity points for doing so.
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
              <>
                {betDetails.map((p, index) => (
                  <div key={index}>
                    <div className="attribute__input">
                      {p.betType == 0 ?
                        (
                          p.totalNumChoices == 2 ?
                          <>
                          <div className="radio__div">
                            <div className="radio__info">
                              <input 
                                type="radio" 
                                id="age1"
                                name="age"
                                checked = {correctChoice == "1"}
                                value="1"
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="1">{p.outcomeOne}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age2" name="age" value="2"
                                checked = {correctChoice == "2"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="2">{p.outcomeTwo}</label>
                            </div>
                          </div>
                          
                          </>
                         :
                          (p.totalNumChoices == 3 ?
                          ( <>
                          <div className="radio__div">
                            <div className="radio__info">
                              <input type="radio" id="age1" name="age" value="1"
                                checked = {correctChoice == "1"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="1">{p.outcomeOne}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age2" name="age" value="2"
                                checked = {correctChoice == "2"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="2">{p.outcomeTwo}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age3" name="age" value="3"
                                checked = {correctChoice == "3"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="3">{p.outcomeThree}</label>
                            </div>
                          </div>
                          
                          </>
                          )
                          :
                          ( <>
                          <div className="radio__div">
                            <div className="radio__info">
                              <input type="radio" id="age1" name="age" value="1"
                                checked = {correctChoice == "1"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="1">{p.outcomeOne}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age2" name="age" value="2"
                              checked = {correctChoice == "2"}
                              onChange= {(e) => {
                                setCorrectChoice(e.target.value)
                                
                                }} />
                              <label for="2">{p.outcomeTwo}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age3" name="age" value="3"
                              checked = {correctChoice == "3"}
                              onChange= {(e) => {
                                setCorrectChoice(e.target.value)
                                
                                }} />
                              <label for="3">{p.outcomeThree}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age4" name="age" value="4"
                              checked = {correctChoice == "4"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="4">{p.outcomeFour}</label>
                            </div>
                          </div>
                          
                          </>
                          )

                        )
                        )
                        
                        :
                        ( <>
                          <div className="radio__div">
                            <div className="radio__info">
                              <input type="radio" id="age1" name="age" value="1"
                                checked = {correctChoice == "1"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="1">{p.privateFirstChoice}</label>
                            </div>

                            <div className="radio__info">
                              <input type="radio" id="age2" name="age" value="2"
                                checked = {correctChoice == "2"}
                                onChange= {(e) => {
                                  setCorrectChoice(e.target.value)
                                  
                                  }} />
                              <label for="2">{p.privateSecondChoice}</label>
                            </div>
                          </div>

                          
                          </>
                        )
                        
                      }
                    </div>
                    {p.betType == 0 ?
                      <div className="attribute__button__div">
                        <button className="attribute__button"
                        onClick={() => {executeBetContract(p.betId)}}
                        >Update</button>
                      </div>
                    :
                    <div className="attribute__button__div">
                      <button className="attribute__button"
                      onClick={() => {executePrivateBetContract(p.betId)}}
                      >Update</button>
                    </div>
                    }
                    
                  </div>
                ))}
              </>
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
            <div className="t__cards">
            {myBets.length > 0 ? (
              <>
                {myBets.map((p, index) => (
                  <div key={index} className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">
                          <span>#{p.betId}</span>
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          {p.betType == 0 ? (
                            <div className="value">
                              {p.totalNOB}
                              <BsFillPersonFill className="person" />
                            </div>
                          ) : p.challengeAccepted.toString() == "false" ? (
                            <div className="value">
                              {1}
                              <BsFillPersonFill className="person" />
                            </div>
                          ) : (
                            <div className="value">
                              {2} <BsFillPersonFill className="person" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          {" "}
                          <div className={
                            p.betType == 0 ?
                            (p.executed  ? " red" : " green") :
                            (!p.active ? " red" : " green")}>
                            
                            {
                            p.betType == 0 ?
                            (p.executed ? "CLOSED" : "OPEN") :
                            (!p.active ? "CLOSED" : "OPEN")}
                          </div>
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          <div className="value1">
                            <div className="value1">
                              <FaMoneyBill className="money" />
                              <p>
                                {p.betType == 0
                                  ? parseFloat(p.totalAmountBet).toFixed(3)
                                  : p.betAmount}{" "}
                                Matic
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="t__center">
                      {p.betType == 0 ? (
                        <IoIosPeople className="state__logo" />
                      ) : (
                        <IoMdPeople className="state__logo" />
                      )}
                    </div>
                    <div className="t__right">
                      <p>{p.betType == 0 ? "Public" : "Private"}</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                          fetchBetsById(p.betId);
                        }}
                      >
                        Details
                      </button>
                      {p.betMaster == address ? (
                        <button
                          className="btn2"
                          onClick={() => {
                            if (p.deadline.getTime() < Date.now() && !p.executed) {
                              setUpdateModal("modal-container");
                              fetchBetsById(p.betId);
                            } else if (p.deadline.getTime() < Date.now() && p.executed) {
                              toast.warning("Bet Already Executed");
                            } 
                            
                            else {
                              toast.warning("Bet DeadLine has not reached");
                            }
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (p.deadline.getTime() > Date.now()) {
                              setEnterModal("modal-container");
                              fetchBetsById(p.betId);
                            } else {
                              toast.warning("Bet DeadLine Reached");
                            }
                          }}
                          className="btn2"
                        >
                          Enter
                        </button>
                      )}
                      {
                        p.betType == 1 ? 
                          address == p.betMaster ?
                        (
                          <button
                            className="btn2"
                            onClick={() => {
                              recallChallengeContract(p.betId);
                            }}
                          >
                            Recall
                          </button>
                        ) : "" : ""
                      }
                      {
                        p.executed ? 
                          p.betType == 0 ? (
                            address == p.betMaster ?
                            (
                              <button
                                className="btn2"
                                onClick={() => {
                                  claimPayoutBetMasterContract(p.betId);
                                }}
                              >
                                Claim
                              </button>
                            ) :
                            (
                              <button
                                className="btn2"
                                onClick={() => {
                                  claimPayoutContract(p.betId);
                                }}
                              >
                                Claim
                              </button>
                            )
                          ) :
                          (
                            <button
                              className="btn2"
                              onClick={() => {
                                claimPayoutPrivateContract(p.betId);
                              }}
                            >
                              Claim
                            </button>
                          ) : ""
                        
                      }
                      
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className="nft__h1">No Bets Created... yet!</h1>
            )}
          </div>
          </motion.div>
        </>
      ) : (
        ""
      )}
      {renderState() == "allBets" ? (
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="table__container__history"
        >
          <h1 className="nft__h1">All Bets</h1>
          <div className="t__cards">
            {bets.length > 0 ? (
              <>
                {bets.map((p, index) => (
                  <div key={index} className="t__card">
                    <div className="t__left">
                      <div className="t__left__info">
                        <div className="subject">
                          <span>#{p.betId}</span>
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          {p.betType == 0 ? (
                            <div className="value">
                              {p.totalNOB}
                              <BsFillPersonFill className="person" />
                            </div>
                          ) : p.challengeAccepted.toString() == "false" ? (
                            <div className="value">
                              {1}
                              <BsFillPersonFill className="person" />
                            </div>
                          ) : (
                            <div className="value">
                              {2} <BsFillPersonFill className="person" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          {" "}
                          <div className={
                            p.betType == 0 ?
                            (p.executed  ? " red" : " green") :
                            (!p.active ? " red" : " green")}>
                            
                            {
                            p.betType == 0 ?
                            (p.executed ? "CLOSED" : "OPEN") :
                            (!p.active ? "CLOSED" : "OPEN")}
                          </div>
                        </div>
                      </div>
                      <div className="t__left__info">
                        <div className="subject">
                          <div className="value1">
                            <div className="value1">
                              <FaMoneyBill className="money" />
                              <p>
                                {p.betType == 0
                                  ? parseFloat(p.totalAmountBet).toFixed(3)
                                  : p.betAmount}{" "}
                                Matic
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="t__center">
                      {p.betType == 0 ? (
                        <IoIosPeople className="state__logo" />
                      ) : (
                        <IoMdPeople className="state__logo" />
                      )}
                    </div>
                    <div className="t__right">
                      <p>{p.betType == 0 ? "Public" : "Private"}</p>
                      <button
                        className="btn1"
                        onClick={() => {
                          setDetailsModal("modal-container");
                          fetchBetsById(p.betId);
                        }}
                      >
                        Details
                      </button>
                      {p.betMaster == address ? (
                        <button
                          className="btn2"
                          onClick={() => {
                            if (p.deadline.getTime() < Date.now() && !p.executed) {
                              setUpdateModal("modal-container");
                              fetchBetsById(p.betId);
                            } else if (p.deadline.getTime() < Date.now() && p.executed) {
                              toast.warning("Bet Already Executed");
                            } 
                            
                            else {
                              toast.warning("Bet DeadLine has not reached");
                            }
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (p.deadline.getTime() > Date.now()) {
                              setEnterModal("modal-container");
                              fetchBetsById(p.betId);
                            } else {
                              toast.warning("Bet DeadLine Reached");
                            }
                          }}
                          className="btn2"
                        >
                          Enter
                        </button>
                      )}
                      {
                        p.betType == 1 ? 
                          address == p.betMaster ?
                        (
                          <button
                            className="btn2"
                            onClick={() => {
                              recallChallengeContract(p.betId);
                            }}
                          >
                            Recall
                          </button>
                        ) : "" : ""
                      }
                      {
                        p.executed ? 
                          p.betType == 0 ? (
                            address == p.betMaster ?
                            (
                              <button
                                className="btn2"
                                onClick={() => {
                                  claimPayoutBetMasterContract(p.betId);
                                }}
                              >
                                Claim
                              </button>
                            ) :
                            (
                              <button
                                className="btn2"
                                onClick={() => {
                                  claimPayoutContract(p.betId);
                                }}
                              >
                                Claim
                              </button>
                            )
                          ) :
                          (
                            <button
                              className="btn2"
                              onClick={() => {
                                claimPayoutPrivateContract(p.betId);
                              }}
                            >
                              Claim
                            </button>
                          ) : ""
                        
                      }
                      
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <Loader />
            )}
          </div>
        </motion.div>
      ) : (
        ""
      )}

      <div className={enterModal}>
        <section class="modal">
          <header class="modal-header">
            <div className="modal__info">
              <h2 class="modal-title">Entering Bet:</h2>
              <p>
                <i>
                  Please enter the amount you want to stake
                  and your option
                </i>
              </p>
            </div>

            <span
              onClick={() => {
                setEnterModal("modal-container__target");
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
                sendEnterRadioValues();
              }}
              className="attribute__div"
            >
              <>
                {betDetails.map((p, index) => (
                  <div key={index}>
                    <div className="attribute__input">
                      {p.betType == 0 ?
                        
                        (
                          <>
                          <p>
                          <input
                            type="number"
                            min="0.5"
                            max="10.0"
                            step= "0.1"
                            required
                            placeholder="Bet Amount"
                            onChange={(e) => setBetStake(e.target.value)}
                            className="text__input__bets"
                          />
                          <br />
                          <br />
                          </p>
                          
                          { p.totalNumChoices == 2 ?
                            (
                            <div className="radio__div">
                              <div className="radio__info">
                                <input 
                                  type="radio" 
                                  id="age1"
                                  name="age"
                                  checked = {usersChoice == "1"}
                                  value="1"
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="1">{p.outcomeOne}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age2" name="age" value="2"
                                  checked = {usersChoice == "2"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="2">{p.outcomeTwo}</label>
                              </div>
                            </div>
                            )
                            
                          :
                            (p.totalNumChoices == 3 ?
                            (
                            <div className="radio__div">
                              <div className="radio__info">
                                <input type="radio" id="age1" name="age" value="1"
                                  checked = {usersChoice == "1"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="1">{p.outcomeOne}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age2" name="age" value="2"
                                  checked = {usersChoice == "2"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="2">{p.outcomeTwo}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age3" name="age" value="3"
                                  checked = {usersChoice == "3"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="3">{p.outcomeThree}</label>
                              </div>
                            </div>
                            
                            
                            )
                            
                            :
                            ( 
                            <div className="radio__div">
                              <div className="radio__info">
                                <input type="radio" id="age1" name="age" value="1"
                                  checked = {usersChoice == "1"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="1">{p.outcomeOne}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age2" name="age" value="2"
                                checked = {usersChoice == "2"}
                                onChange= {(e) => {
                                  setUsersChoice(e.target.value)
                                  
                                  }} />
                                <label for="2">{p.outcomeTwo}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age3" name="age" value="3"
                                checked = {usersChoice == "3"}
                                onChange= {(e) => {
                                  setUsersChoice(e.target.value)
                                  
                                  }} />
                                <label for="3">{p.outcomeThree}</label>
                              </div>

                              <div className="radio__info">
                                <input type="radio" id="age4" name="age" value="4"
                                checked = {usersChoice == "4"}
                                  onChange= {(e) => {
                                    setUsersChoice(e.target.value)
                                    
                                    }} />
                                <label for="4">{p.outcomeFour}</label>
                              </div>
                            </div>
                          
                          
                          )

                        )}
                          
                        </>
                        )
                        :
                        ( 
                        address == p.opponentAddress ?
                        (
                          <div className="modal__info">
                            
                            <p>
                                <b>Bet Name: </b>
                                
                                {p.eventName}
                                <br />
                                <b>Stake: </b>
                                
                                {p.betAmount}
                                <br />
                                <b>Participants: </b>
                                <br />
                                <i> {p.betMaster} : {p.privateFirstChoice} </i>
                                <br />
                                <i> {p.opponentAddress} : {p.privateSecondChoice} </i>
                                <br />
                                <br />
                            </p>
                          </div>
                        ) :
                        (
                          <div className="modal__info">
                        
                            <p>
                              This is a private bet between: <i> {p.betMaster } </i> and 
                              <i>{ p.opponentAddress}</i>. <br /> <br />
                              <i>{address} </i>  is NOT ALLOWED to participate. 
                            </p>
                            <br />
                            <br />
                          </div>
                        )
                        )
                        
                      }
                    </div>
                    {p.betType == 0 ?
                      <div className="attribute__button__div">
                        <button className="attribute__button"
                        onClick={() => {placeBetContract(p.betId)}}
                        >Place Bet</button>
                      </div>
                    :
                    <div className="attribute__button__div">
                      <button className="attribute__button"
                      // disabled = {address == p.opponentAddress ? "false" : "true"}
                      onClick={() => {placePrivateBetContract(p.betId)}}
                      >Accept Challenge</button>
                    </div>
                    }
                    
                  </div>
                ))}
              </>
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
              <>
                {betDetails.map((p, index) => (
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
                          <p className="value">
                            {p.betType == 0 ? "Public" : "Private"}
                          </p>
                        </div>

                        {p.betType == 0 ? (
                          ""
                        ) : (
                          <div className="details__values">
                            <p>Bet Price:</p>
                            <p className="value">{p.betAmount}</p>
                          </div>
                        )}

                        {p.betType == 0 ? (
                          <>
                            <div className="details__values">
                              <p>First Outcome:</p>
                              <p className="value">{p.outcomeOne}</p>
                            </div>

                            <div className="details__values">
                              <p>Second Outcome:</p>
                              <p className="value">{p.outcomeTwo}</p>
                            </div>

                            {p.totalNumChoices == 2 ? (
                              ""
                            ) : p.totalNumChoices == 3 ? (
                              <div className="details__values">
                                <p>Third Outcome:</p>
                                <p className="value">{p.outcomeThree}</p>
                              </div>
                            ) : (
                              <>
                                <div className="details__values">
                                  <p>Third Outcome:</p>
                                  <p className="value">{p.outcomeThree}</p>
                                </div>
                                <div className="details__values">
                                  <p>Fourth Outcome:</p>
                                  <p className="value">{p.outcomeFour}</p>
                                </div>
                              </>
                            )}

                            <div className="details__values">
                              <p>First Odd:</p>
                              <p className="value">
                                {parseFloat(p.finalOddOne).toFixed(4)}
                              </p>
                            </div>

                            <div className="details__values">
                              <p>Second Odds:</p>
                              <p className="value">
                                {parseFloat(p.finalOddTwo).toFixed(4)}
                              </p>
                            </div>

                            {p.totalNumChoices == 2 ? (
                              ""
                            ) : ( p.totalNumChoices == 3 ? (
                              <div className="details__values">
                                <p>Third Odd:</p>
                                <p className="value">
                                  {parseFloat(p.finalOddThree).toFixed(4)}
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="details__values">
                                  <p>Third Odd:</p>
                                  <p className="value">
                                    {parseFloat(p.finalOddThree).toFixed(4)}
                                  </p>
                                </div>
                                <div className="details__values">
                                  <p>Fourth Odd:</p>
                                  <p className="value">
                                    {parseFloat(p.finalOddFour).toFixed(4)}
                                  </p>
                                </div>
                              </>
                            ))}

                            <div className="details__values">
                              <p>Total Bets Placed:</p>
                              <p className="value">{p.totalNOB.toString()}</p>
                            </div>

                            <div className="details__values">
                              <p>Total Amount Bet:</p>
                              <p className="value">
                                {parseFloat(p.totalAmountBet).toFixed(3)} Matic
                              </p>
                            </div>

                            <div className="details__values">
                              <p>Correct Outcome:</p>
                              <p className="value">
                                {p.corrChoice == 0
                                  ? "N/A"
                                  : p.corrChoice == 1
                                  ? p.outcomeOne
                                  : p.corrChoice == 2
                                  ? p.outcomeTwo
                                  : p.corrChoice == 3
                                  ? p.outcomeThree
                                  : p.outcomeFour}
                              </p>
                            </div>
                          </>
                        ) : (
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
                              <p className="value">
                                {p.challengeAccepted.toString()}
                              </p>
                            </div>

                            <div className="details__values">
                              <p>Bet Active:</p>
                              <p className="value">{p.active.toString()}</p>
                            </div>

                            <div className="details__values">
                              <p>Correct Outcome:</p>
                              <p className="value">
                                {p.privateCorrChoice}
                              </p>
                            </div>

                            <div className="details__values">
                              <p>Winner:</p>
                              <p className="value">
                                {p.privateCorrChoice == p.privateFirstChoice ? 
                                  p.betMaster : (p.privateCorrChoice == p.privateSecondChoice ?
                                  p.opponentAddress : "N/A")
                                }
                              </p>
                            </div>
                          </>
                        )}
                        
                        <div className="details__values">
                          <p>Executed:</p>
                          <p className="value">{p.executed.toString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </form>
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default Bets;
