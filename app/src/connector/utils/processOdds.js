import { utils } from "ethers";

export const squash = (number) => {
    console.log("HERE SQUASH");
    if (number == 0) return number;
    else {
      let solution = number ** (-0.2);
      return solution;
    }
  }

export const squashOdds = (num) => {
    console.log('HERE SQUASH ODDS');
    let finalOddsArray = [];
    let i;
    for (i in num) {
      let j = parseFloat(utils.formatEther(num[i]));
      console.log("SQUASHING ODDS...", j);
      let x = squash(j);
      console.log("SQUASHEED...", x);
      finalOddsArray.push(x);
    }
    return finalOddsArray;
}

