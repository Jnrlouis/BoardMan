import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";

export const claimPayout = async (signer, _betId) => {
    try {
      const contract = getBoardManContractInstance(signer);
      let payout = await contract.claimPayout(_betId);
    //   setLoading(true);
      await payout.wait();
    //   setLoading(false);
   
    } catch (error) {
    //   setLoading(false);
      window.alert(error.message);
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
 
  } catch (error) {
  //   setLoading(false);
    window.alert(error.message);
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
 
  } catch (error) {
  //   setLoading(false);
    window.alert(error.message);
    console.log(error)
  }
}