import { subgraphQuery } from "./utils.js";

function FETCH_MY_BETS_ID(myBetAddress) {
    return `query {
        betEvents(where: {betMaster: "${myBetAddress}"}, orderBy: id, orderDirection:desc) {
            id
        }   
      }`;
};

export const getMyBets = async (myBetAddress) => {
    try {
      const myBetsQuery = await subgraphQuery(FETCH_MY_BETS_ID(myBetAddress));
      let myBets = [];
      let allMyCreatedBetsId = [];
      myBets = myBetsQuery.betEvents;
      myBets.forEach(myBet => {
        allMyCreatedBetsId.push([
          myBet.id
        ]); 
      });
      return allMyCreatedBetsId;
      
    } catch (err) {
      console.log(err);
    }
  }