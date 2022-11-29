import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const executeBet = async (signer, _betId, correctChoice) => {
    try {
      const contract = getBoardManContractInstance(signer);
      let executeEventContract = await contract.executeBetEvent(_betId, correctChoice.toString());
      await executeEventContract.wait();
      toast.success("Bet Event Executed Successfully");
    } catch (error) {
      toast.error("An Error occurred");
      console.log(error)
    }
}

export const executePrivateBet = async (signer, _betId, correctChoice) => {
  try {
    const contract = getBoardManContractInstance(signer);
    let executeEventContract = await contract.PPaddCorrectChoice(_betId, correctChoice.toString());
    await executeEventContract.wait();
    toast.success("Bet Event Executed Successfully");
    
  } catch (error) {
    toast.error("An Error occurred");
    console.log(error)
  }
}