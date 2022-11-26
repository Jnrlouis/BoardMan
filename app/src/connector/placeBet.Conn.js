import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";
import { squashOdds } from "./utils/processOdds";
import { getOdds } from "./utils/getOdds";
import { utils } from "ethers";
import { fetchAllBets } from "./utils/utils";

export const placeBet = async (signer, betId, choice, stake) => {
    try {
      const contract = getBoardManContractInstance(signer);

      const txn = await contract.placeBet(betId, choice.toString(), {value: stake});

    //   setLoading(true);
      await txn.wait();
      let odds = await getOdds(betId);
      let finalX = squashOdds(odds);
      console.log("HERE AFTER SQUASH ODDS PLACE BET, FINALX", finalX);
      let FFOdd = utils.parseEther(finalX[0].toString());
      let SFOdd = utils.parseEther(finalX[1].toString());
      let TFOdd = utils.parseEther(finalX[2].toString());
      let FoFOdd = utils.parseEther(finalX[3].toString());
      let tx = await contract.finalOdds(betId, FFOdd, SFOdd, TFOdd, FoFOdd);
      await tx.wait();
    //   setLoading(false);
      await fetchAllBets();
    } catch (error) {
      console.error(error);
    //   setLoading(false);
      window.alert(error.message);
    }
};