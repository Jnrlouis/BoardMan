import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";
import { squashOdds } from "./utils/processOdds";
import { getOdds } from "./utils/getOdds";
import { utils } from "ethers";
import { fetchAllBets, getPrivateBetAmount } from "./utils/utils";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const placeBet = async (signer, betId, choice, stake) => {
    try {
      toast.info("Accept Both transactions from your wallet", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      const contract = getBoardManContractInstance(signer);
      stake = utils.parseEther(stake);
      const txn = await contract.placeBet(betId, choice.toString(), {value: stake});

    //   setLoading(true);
      await txn.wait();
      let odds = await getOdds(signer, betId);
      let finalX = squashOdds(odds);
      console.log("HERE AFTER SQUASH ODDS PLACE BET, FINALX", finalX);
      let FFOdd = utils.parseEther(finalX[0].toString());
      let SFOdd = utils.parseEther(finalX[1].toString());
      let TFOdd = utils.parseEther(finalX[2].toString());
      let FoFOdd = utils.parseEther(finalX[3].toString());
      let tx = await contract.finalOdds(betId, FFOdd, SFOdd, TFOdd, FoFOdd);
      await tx.wait();
    //   setLoading(false);
      await fetchAllBets(signer);
      toast.success("Bet Placed successfully!")
    } catch (error) {
      console.error(error);
    //   setLoading(false);
      toast.error("An Error occurred");
    }
};

export const acceptChallenge = async (signer, betId) => {
  try {
    let amount = await getPrivateBetAmount(signer, betId);
    amount = utils.parseEther(amount);
    console.log("Amount: ", amount);
    const contract = getBoardManContractInstance(signer);

    const txn = await contract.acceptChallenge(betId, {value: amount});

    await txn.wait();

    toast.success("Challenge accepted successfully")

  } catch (error) {
    console.error(error);
    toast.error("An Error occurred");
  }
}

export const recallChallenge = async (signer, betId) => {
  try {
    
    const contract = getBoardManContractInstance(signer);

    const txn = await contract.recallChallenge(betId);

    await txn.wait();

    toast.success("Challenged recalled successfully")

  } catch (error) {
    console.error(error);
    toast.error("An Error occurred");
  }
}