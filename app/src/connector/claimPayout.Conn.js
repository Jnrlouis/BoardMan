import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const claimPayout = async (signer, _betId) => {
    try {
      const contract = getBoardManContractInstance(signer);
      let payout = await contract.claimPayout(_betId);
    //   setLoading(true);
      await payout.wait();
    //   setLoading(false);
      toast.success("Payout claimed successfully");
    } catch (error) {
    //   setLoading(false);
      toast.error(error.message);
      console.log(error)
    }
}

export const claimPayoutBetMaster = async (signer, _betId) => {
  try {
    const contract = getBoardManContractInstance(signer);
    let payout = await contract.claimBetMaster(_betId);
  //   setLoading(true);
    await payout.wait();
  //   setLoading(false);
    toast.success("Payout claimed successfully");
  } catch (error) {
  //   setLoading(false);
    toast.error(error.message);
    console.log(error)
  }
}

export const claimPayoutPrivate = async (signer, _betId) => {
  try {
    const contract = getBoardManContractInstance(signer);
    let payout = await contract.winnerTakesAll(_betId);
  //   setLoading(true);
    await payout.wait();
  //   setLoading(false);
    toast.success("Payout claimed successfully");
  } catch (error) {
  //   setLoading(false);
    toast.error(error.message);
    console.log(error)
  }
}