
import { getBoardManContractInstance } from "./getBoardManContractInstance";


export const getNumBets = async (provider) => {
    try {
      const contract = getBoardManContractInstance(provider);
      const numOfBets = await contract.numBetEvents();
      console.log("Num of Bets: ", numOfBets);
      return numOfBets.toString();
    } catch (error) {
      console.error(error);
    }
};