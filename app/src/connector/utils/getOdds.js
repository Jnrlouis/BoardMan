import { getBoardManContractInstance } from "./getBoardManContractInstance";

export const getOdds = async (signer, _betId) => {
    try {
      const contract = getBoardManContractInstance(signer);
      let odds = await contract.getStageOneOdds(_betId);
      console.log("GET ODDS....", odds);
      return odds;
    } catch (error) {
      console.error(error)
    }
} 