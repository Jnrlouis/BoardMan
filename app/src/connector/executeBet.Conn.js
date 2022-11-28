import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";

export const executeBet = async (signer, _betId, correctChoice) => {
    try {
      const contract = getBoardManContractInstance(signer);
      let executeEventContract = await contract.executeBetEvent(_betId, correctChoice.toString());
      await executeEventContract.wait();
   
    } catch (error) {
      window.alert(error.message);
      console.log(error)
    }
}

export const executePrivateBet = async (signer, _betId, correctChoice) => {
  try {
    const contract = getBoardManContractInstance(signer);
    let executeEventContract = await contract.PPaddCorrectChoice(_betId, correctChoice.toString());
    await executeEventContract.wait();
 
  } catch (error) {
    window.alert(error.message);
    console.log(error)
  }
}