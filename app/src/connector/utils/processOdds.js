import { utils } from "ethers";

export const squash = (number) => {
    if (number == 0) return number;
    else {
      let solution = number ** (-0.2);
      return solution;
    }
  }

export const squashOdds = (num) => {
    let finalOddsArray = [];
    let i;
    for (i in num) {
      let j = parseFloat(utils.formatEther(num[i]));
      console.log("SQUASHING ODDS...", j);
      let x = squash(j);
      console.log("SQUASHED...", x);
      finalOddsArray.push(x);
    }
    return finalOddsArray;
}

