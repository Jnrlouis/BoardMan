import { subgraphQuery } from "./utils.js";

function FETCH_BETMASTER_BETS_ID(address) {
    return `query {
        betEvents(
          orderBy: id
          orderDirection: desc
          where: {betMaster : "${address}"}
        ) {
          id
        }
      }`;
};

export const getBetMasterBets = async (inputAddress) => {
    try {
      const BetMasterBetsQuery = await subgraphQuery(FETCH_BETMASTER_BETS_ID(inputAddress));
      let BetMasterBets = [];
      let allBetMasterBetsId = [];
      BetMasterBets = BetMasterBetsQuery.betEvents;
      BetMasterBets.forEach(BetMasterBet => {
        allBetMasterBetsId.push([
          BetMasterBet.id
        ]); 
      });
      return allBetMasterBetsId;     
    } catch (err) {
      console.log(err);
    }
}