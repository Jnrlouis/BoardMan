import { utils } from "ethers";
import { getBoardManContractInstance } from "./utils/getBoardManContractInstance";
  
export const createBet = async (signer, nameBetEvent, nameChoiceOne, nameChoiceTwo, nameChoiceThree, nameChoiceFour, deadline) => {
    try {
        const amount = utils.parseEther("5");
        const unixDeadline = new Date(deadline.toString()).getTime() / 1000
        const nameChoiceOneBytes = utils.formatBytes32String(nameChoiceOne);
        const nameChoiceTwoBytes = utils.formatBytes32String(nameChoiceTwo);
        const nameChoiceThreeBytes = utils.formatBytes32String(nameChoiceThree);
        const nameChoiceFourBytes = utils.formatBytes32String(nameChoiceFour);
        const contract = getBoardManContractInstance(signer);

        if (nameChoiceOne == "" || nameChoiceTwo == "") {
          alert("First or Second Outcomes cannot be empty!");
        }
        if (nameChoiceOne !== "" && nameChoiceTwo !== "" && 
          nameChoiceFour == "" && nameChoiceThree !== "") {
            const data = await contract.createBetEventThree( nameBetEvent.toString(), unixDeadline, 
              nameChoiceOneBytes, nameChoiceTwoBytes, nameChoiceThreeBytes, {value: amount});
            // setLoading(true);
              console.info("contract call successs", data);
              alert("Bet Event Created!!");
            // setLoading(false);
          }
        if (nameChoiceOne !== "" && nameChoiceTwo !== "" &&
          nameChoiceThree == "" && nameChoiceFour =="") {
            const data = await contract.createBetEventTwo(nameBetEvent.toString(), unixDeadline, 
              nameChoiceOneBytes, nameChoiceTwoBytes, {value: amount});
            // setLoading(true);
              console.info("contract call successs", data);
              alert("Bet Event Created!!");
            // setLoading(false);
          }
        if (nameChoiceOne !== "" && nameChoiceTwo !== "" &&
          nameChoiceFour !== "" && nameChoiceThree !== "") {
            const data = await contract.createBetEventFour( nameBetEvent.toString(), unixDeadline, 
              nameChoiceOneBytes, nameChoiceTwoBytes, nameChoiceThreeBytes, nameChoiceFourBytes, {value: amount});
            // setLoading(true);
              console.info("contract call successs", data);
              alert("Bet Event Created!!");
            // setLoading(false);
          }
        
    } catch (err) {
        console.error("contract call failure", err);
        // setLoading(false);
    }
  };

  export const createPrivateBet = async (signer, nameBetEvent, deadline, opponentAddress, nameChoiceOne, nameChoiceTwo, stake ) => {
    try {
        const amount = utils.parseEther(stake)
        const unixDeadline = new Date(deadline.toString()).getTime() / 1000
        const nameChoiceOneBytes = utils.formatBytes32String(nameChoiceOne);
        const nameChoiceTwoBytes = utils.formatBytes32String(nameChoiceTwo);
        const contract = getBoardManContractInstance(signer);

        if (nameChoiceOne == "" || nameChoiceTwo == "" || opponentAddress == "") {
          alert("Outcomes or Opponent Address cannot be empty!");
        }
        const data = await contract.createPrivateBetEvent( nameBetEvent.toString(), unixDeadline,
          opponentAddress.toString(), 
          nameChoiceOneBytes, nameChoiceTwoBytes, amount, {value: amount});
        // setLoading(true);
          console.info("contract call successs", data);
          alert("Bet Event Created!!");
        // setLoading(false);
        
    } catch (err) {
        console.error("contract call failure", err);
        // setLoading(false);
    }
  };