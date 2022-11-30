import { utils } from "ethers";
import { getBoardManContractInstance } from "./getBoardManContractInstance";
import { getNumBets } from "./getNumBets";
import { getMyBets } from "../../queries/mybets.js";
import { getPopularBets} from "../../queries/getPopularBets"

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 export const fetchBetsById = async (provider, id) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const bet = await contract.betEvents(id);
      const parsedBet = {
        betId: id,
        deadline: new Date(parseInt(bet.init.deadline.toString()) * 1000),
        betMaster: bet.init.betMaster,
        eventName: bet.init.name,
        betType: bet.privorpub.privateOrPublic,
        outcomeOne: utils.parseBytes32String(bet.choiceOne.choiceOne_),
        outcomeTwo: utils.parseBytes32String(bet.choiceTwo.choiceTwo_),
        outcomeThree: utils.parseBytes32String(bet.choiceThree.choiceThree_),
        outcomeFour: utils.parseBytes32String(bet.choiceFour.choiceFour_),
        finalOddOne: utils.formatEther(bet.choiceOne.finalOddOne),
        finalOddTwo: utils.formatEther(bet.choiceTwo.finalOddTwo),
        finalOddThree: utils.formatEther(bet.choiceThree.finalOddThree),
        finalOddFour: utils.formatEther(bet.choiceFour.finalOddFour),
        betAmount: utils.formatEther(bet.privorpub.PP_amount),
        privateFirstChoice: utils.parseBytes32String(bet.privorpub.PP_yourChoice),
        privateSecondChoice: utils.parseBytes32String(bet.privorpub.PP_opponentsChoice),
        active: bet.privorpub.active,
        opponentAddress: bet.privorpub.privateBetOpponent,
        challengeAccepted: bet.privorpub.challengeAccepted,
        totalNumChoices: bet.init.numOfChoices,
        totalNOB: bet.totals.totalBets.toString(),
        totalAmountBet: utils.formatEther(bet.totals.totalAmount),
        corrChoice: bet.finalize.correctChoice,
        privateCorrChoice: utils.parseBytes32String(bet.privorpub.PP_correctChoice),
        executed: bet.finalize.executed,

      };
      return parsedBet;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  };

  export const fetchAllBets = async (provider) => {
    try {
      const numOfBets = await getNumBets(provider);
      const bets = [];
      //Hooks: numBets, SetBets
      for (let i = 0; i < numOfBets; i++) {
        const bet = await fetchBetsById(provider, i);
        bets.push(bet);
      }
      // setBets(bets);
      return bets;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  };

  export const fetchAllMyBets = async (provider, myBetAddress) => {
    try {
      const myBetsId = await getMyBets(myBetAddress);
      const numBetsId = myBetsId.length;
      const bets = [];
      for (let i = 0; i < numBetsId; i++) {
        let j = myBetsId[i][0];
        const bet = await fetchBetsById(provider, j);
        bets.push(bet);
      }
      return bets;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  };

  export const fetchAllPopularBets = async (provider) => {
    try {
      const popularBetsId = await getPopularBets();
      const numBetsId = popularBetsId.length;
      const bets = [];
      for (let i = 0; i < numBetsId; i++) {
        let j = popularBetsId[i][0];
        const bet = await fetchBetsById(provider, j);
        bets.push(bet);
      }
      return bets;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  };

  export const getPrivateBetAmount = async (provider, id) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const bet = await contract.betEvents(id);
      const amount = utils.formatEther(bet.privorpub.PP_amount);
      return amount;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  }

  export const getChallengeAccepted = async (provider, id) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const bet = await contract.betEvents(id);
      const accepted = bet.privorpub.challengeAccepted;
      return accepted;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  }

  export const checkActive = async (provider, id) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const bet = await contract.betEvents(id);
      const isActive = bet.privorpub.active;
      return isActive;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  }

  export const checkExecuted = async (provider, id) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const bet = await contract.betEvents(id);
      const isExecuted = bet.finalize.executed;
      return isExecuted;
    } catch (error) {
      console.error(error);
      toast.error("An Error occured!");
    }
  }