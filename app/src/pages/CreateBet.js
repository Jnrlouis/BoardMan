import React, { useRef, useState, useEffect } from "react";
import "./styles/CreateBet.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineDollar, AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { createBet, createPrivateBet } from "../connector/createBet.Conn";
import { getProviderOrSigner } from "../connector/utils/getProviderOrSigner";
import { FaMoneyBill } from "react-icons/fa";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import pol from "../assets/polygon.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBet = (props) => {
  const [pinstate, setPinstate] = useState("pick");

  const [nameBetEvent, setNameBetEvent] = useState("");
  const [nameChoiceOne, setNameChoiceOne] = useState("");
  const [nameChoiceTwo, setNameChoiceTwo] = useState("");
  const [nameChoiceThree, setNameChoiceThree] = useState("");
  const [nameChoiceFour, setNameChoiceFour] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [inputValueNftDescription, setInputValueNftDescription] = useState("");
  const [inputValueAttribute, setInputValueAttribute] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [inputWalletAddress, setInputWalletAddress] = useState("");

  const [attributeValues, setAttributeValues] = useState([]);

  const [images, setImages] = useState([]);
  const [guideState, setGuideState] = useState(false);

  const [nftModal, setNftModal] = useState("modal-container__target");
  const [updateModal, setUpdateModal] = useState("modal-container__target");
  const [detailsModal, setDetailsModal] = useState("modal-container__target");

  const wrapperRef = useRef(null);
  const web3ModalRef = useRef();

  const renderState = () => {
    let state;

    if (pinstate == "private") {
      state = "private";
    } else if (pinstate == "public") {
      state = "public";
    } else {
      state = "pick";
    }

    return state;
  };

  const handleState = (e) => {
    setPinstate(e.target.value);
  };

  const onInputChangeWalletAddress = (event) => {
    const { value } = event.target;
    setInputWalletAddress(value);
  };

  const deleteAttributeValue = (index) => {
    const updatedList = [...attributeValues];
    updatedList.splice(index, 1);
    updatedList.length == 0 ? setNameChoiceThree("") : setNameChoiceFour("");

    setAttributeValues(updatedList);
  };

  const sendAttributeValue = () => {
    if (attributeValues.length < 2) {
      setAttributeValues([...attributeValues, inputValueAttribute]);

      setNftModal("modal-container__target");
    } else {
      alert("Max Number of Options");
    }
  };

  const sendRadioValues = () => {
    setUpdateModal("modal-container__target");
  };

  const sendDetailsValue = () => {
    setDetailsModal("modal-container__target");
  };

  const createBetContract = async () => {
    const signer = await getProviderOrSigner(web3ModalRef, true);
    await createBet(
      signer,
      nameBetEvent,
      nameChoiceOne,
      nameChoiceTwo,
      nameChoiceThree,
      nameChoiceFour,
      deadline
    );
  };

  const createPrivateBetContract = async () => {
    const signer = await getProviderOrSigner(web3ModalRef, true);

    await createPrivateBet(
      signer,
      nameBetEvent,
      deadline,
      inputWalletAddress,
      nameChoiceOne,
      nameChoiceTwo,
      betAmount
    );
  };

  const navigate = useNavigate();
  return (
    <div className="createBet__container">
      <ToastContainer />
      <div className="createBet__box">
        <h1>CREATE YOUR BET</h1>
        <br />
        <h3>GUIDELINES</h3>
        <p className="guide">
          <i>
            <b>
              Always use concise descriptive unambiguous Bet Event Names. DO NOT
              USE: PORTUGAL VS URUGUAY USE: Winner of Portugal VS Uruguay 2022
              World Cup Match Always use all possible outcomes in the Event
              options. Example: Winner of Portugal VS Uruguay 2022 World Cup
              Match DO NOT USE - Outcome One: Portugal; Outcome Two: Uruguay USE
              - Outcome One: Portugal; Outcome Two: Uruguay; Outcome Three:{" "}
            </b>
          </i>

          <div className={guideState ? "open__guide" : "close__guide"}>
            <i>
              <b>
                Draw The Bet Deadline to be used should be BEFORE the Outcome
                can be decided. Example: Would it rain in GRA, Port Harcourt,
                Nigeria on the 30th Nov 2022? DO NOT USE - Deadline: 31st
                November 2022 9:00 AM USE - Deadline: 29th November 2022 9:00 PM
                Avoid Creating One-sided Bet Events as you may lose your Bet
                Creation Fee if you do so. Create controversial Bet Events with
                well-balanced Possible Outcomes. Promote your Bet Events by
                sharing the ID on your social media platforms and inviting
                others to place their bets. Bet Responsibly!{" "}
              </b>
            </i>
          </div>
          <span
            onClick={() => {
              setGuideState(!guideState);
            }}
          >
            {guideState ? "Show Less" : "Show More"}
          </span>
        </p>
        <br />
        <div ref={wrapperRef} className="drop-file-input">
          <div className="drop-file-input__label">
            <p>Choose Your Bet Type</p>
          </div>
          <div className="pinning__selector">
            <div className="selector__div">
              <select
                required
                onChange={handleState}
                value={pinstate}
                className="selector"
              >
                <option value="pick" selected>
                  Select Bet Type
                </option>
                <option value="public">Public Bet</option>
                <option value="private">Private Bet</option>
              </select>
            </div>
          </div>
        </div>

        {renderState() == "private" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="drop-file-preview"
          >
            <p className="bet__p">Private Bets</p>
            <div className="mint__text__input">
              <input
                type="text"
                required
                placeholder="Enter Event Name"
                onChange={(e) => setNameBetEvent(e.target.value)}
                className="text__input__name"
              />

              <input
                type="number"
                required
                placeholder="Enter Bet Amount in Matic"
                min="0.5"
                max="5.0"
                step="0.1"
                onChange={(e) => setBetAmount(e.target.value)}
                className="text__input__name"
              />

              <input
                type="text"
                required
                placeholder="Enter opponent Wallet"
                value={inputWalletAddress}
                onChange={onInputChangeWalletAddress}
                className="text__input__name"
              />

              <div>
                <span className="details">Deadline:</span>
                <input
                  type="datetime-local"
                  name="deadline"
                  onChange={(e) => setDeadline(e.target.value)}
                  className="text__input__name"
                  required
                />
              </div>

              <div>
                <span className="details">Outcomes:</span>
                <div className="attr__input">
                  <input
                    className="text__input__attr"
                    placeholder="First Outcome"
                    type="text"
                    required
                    minLength="1"
                    maxLength="25"
                    onChange={(e) => setNameChoiceOne(e.target.value)}
                  />
                </div>
                <div className="attr__input">
                  <input
                    className="text__input__attr"
                    placeholder="Second Outcome"
                    type="text"
                    required
                    minLength="1"
                    maxLength="25"
                    onChange={(e) => setNameChoiceTwo(e.target.value)}
                  />
                </div>
              </div>
              <div className="nft__upload__div">
                <button
                  onClick={createPrivateBetContract}
                  className="nft__upload"
                >
                  <div className="button__text">Create</div>
                </button>
              </div>
            </div>
          </form>
        ) : null}

        {renderState() == "public" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="drop-file-preview"
          >
            <p className="bet__p">Public Bets</p>
            <div className="mint__text__input1">
              <input
                type="text"
                required
                placeholder="Enter Event Name"
                value={nameBetEvent}
                onChange={(e) => setNameBetEvent(e.target.value)}
                className="text__input__name"
              />

              <p className="bet__amount">
                Bet Amount: <img className="polygon" src={pol} alt="" /> 5 {" "}
              </p>

              <div>
                <span className="details">Deadline:</span>
                <input
                  type="datetime-local"
                  name="deadline"
                  onChange={(e) => setDeadline(e.target.value)}
                  className="text__input__name"
                  required
                />
              </div>
              <div>
                <span className="details">Outcomes:</span>
                <div className="attr__input">
                  <input
                    className="text__input__attr"
                    placeholder="First Outcome"
                    type="text"
                    required
                    minLength="1"
                    maxLength="25"
                    onChange={(e) => setNameChoiceOne(e.target.value)}
                  />
                </div>
                <div className="attr__input">
                  <input
                    className="text__input__attr"
                    placeholder="Second Outcome"
                    type="text"
                    required
                    minLength="1"
                    maxLength="25"
                    onChange={(e) => setNameChoiceTwo(e.target.value)}
                  />
                </div>
              </div>
              {attributeValues.length > 0 ? (
                <div>
                  {attributeValues.map((attribute, index) => (
                    <div key={index} className="attr__input">
                      <input
                        type="text"
                        placeholder="Other Outcome"
                        className="text__input__attr"
                        minLength="1"
                        maxLength="25"
                        onChange={(e) => {
                          index == 0
                            ? setNameChoiceThree(e.target.value)
                            : setNameChoiceFour(e.target.value);
                        }}
                      />

                      <button
                        onClick={deleteAttributeValue}
                        className="delete__button"
                      >
                        <span className="attr__delete">
                          <AiFillDelete className="attr__delete__icon" />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="add__attributes">
                <div className="add__link">
                  <span className="add__icon__span">
                    <AiOutlinePlus className="add__icon" />
                  </span>
                  <div className="add__text" onClick={sendAttributeValue}>
                    Add Event Options
                  </div>
                </div>
              </div>

              <div className="nft__upload__div">
                <button onClick={createBetContract} className="nft__upload">
                  <div className="button__text">Create</div>
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="enterbutton__div__heroarea">
        <button onClick={() => navigate("/bets")} className="enter__button">
          <span className="button__text">View Bet</span>
        </button>
      </div>

      {/* <div className="nft__div">
        <h1 className="nft__h1">My Bets</h1>

        <div className="t__cards">
          <div className="t__card">
            <div className="t__left">
              <div className="t__left__info">
                <div className="subject">No of entries::</div>
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
      </div> */}
    </div>
  );
};

export default CreateBet;
