import React, { useRef, useState, useEffect } from "react";
import { BsPlayBtn, BsFillPersonFill } from "react-icons/bs";
import "./Trending.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { FaMoneyBill } from "react-icons/fa";
import { IoIosPeople, IoMdPeople } from "react-icons/io";
import Loader from "../../constants/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pol from "../../assets/polygon.svg";
import { getProviderOrSigner } from "../../connector/utils/getProviderOrSigner";
import {
  fetchAllPopularBets,
  fetchBetsById,
} from "../../connector/utils/utils";
import { useAccount, useNetwork } from "wagmi";

const Trending = () => {
  const web3ModalRef = useRef();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id == 80001) {
      console.log("Chain ID is: ", chain.id);
      SearchPopularBets();
    }  
  }, [chain]);

  const navigate = useNavigate();
  const [popularBets, setPopularBets] = useState([]);
  const [bets, setBets] = useState([]);
  const [betDetails, setBetDetails] = useState([]);
  const [detailsModal, setDetailsModal] = useState("modal-container__target");

  const address = useAccount().address;

  const sendDetailsValue = () => {
    setDetailsModal("modal-container__target");
  };

  const SearchPopularBets = async () => {
    try {
      const provider = await getProviderOrSigner(web3ModalRef);
      if (provider) {
        const popularBet = await fetchAllPopularBets(provider);
        setPopularBets(popularBet);
      } else {
        setPopularBets([])
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const fetchBetsByIds = async (BETid) => {
    try {
      setBetDetails([]);
      const provider = await getProviderOrSigner(web3ModalRef);
      let fetchedBetList = [];
      const fetchedBet = await fetchBetsById(provider, BETid);
      fetchedBetList.push(fetchedBet);
      console.log("fETCHED bETTT", fetchedBetList);
      setBetDetails(fetchedBetList);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="t__container">
      <ToastContainer />

      <div className="t__h1">
        <p>Trending Bets</p>
        <p onClick={() => navigate("bets")} className="h1__p1">
          View All
        </p>
      </div>
      <div className="t__cards">
        {popularBets.length > 0 ? (
          <>
            {popularBets.map((p, index) => (
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
                      <div
                        className={
                          p.betType == 0
                            ? p.executed
                              ? " red"
                              : " green"
                            : !p.active
                            ? " red"
                            : " green"
                        }
                      >
                        {p.betType == 0
                          ? p.executed
                            ? "CLOSED"
                            : "OPEN"
                          : !p.active
                          ? "CLOSED"
                          : "OPEN"}
                      </div>
                    </div>
                  </div>
                  <div className="t__left__info">
                    <div className="subject">
                      <div className="value1">
                        <div className="value1">
                          <img className="polygon" src={pol} alt="" />
                          <p>
                            {p.betType == 0
                              ? parseFloat(p.totalAmountBet).toFixed(3)
                              : p.betAmount}{" "}
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
                      fetchBetsByIds(p.betId);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Loader />
        )}
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
                            ) : p.totalNumChoices == 3 ? (
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
                            )}

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
                              <p className="value">{p.privateCorrChoice}</p>
                            </div>

                            <div className="details__values">
                              <p>Winner:</p>
                              <p className="value">
                                {p.privateCorrChoice == p.privateFirstChoice
                                  ? p.betMaster
                                  : p.privateCorrChoice == p.privateSecondChoice
                                  ? p.opponentAddress
                                  : "N/A"}
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

      {/* <div>
      <button className="attribute__button"
        onClick={SearchPopularBets}
        >
        Popular Bets
      </button>
      </div> */}
    </div>
  );
};

export default Trending;
