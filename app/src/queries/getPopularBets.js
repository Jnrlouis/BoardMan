import { subgraphQuery } from "./utils.js";

function FETCH_POPULAR_BETS_ID() {
    return `query {
        betEvents(
          first: 5
          orderBy: totalNOB
          orderDirection: desc
        ) {
          id
        }
      }`;
};

export const getPopularBets = async () => {
    try {
      const popularBetsQuery = await subgraphQuery(FETCH_POPULAR_BETS_ID());
      let popularBets = [];
      let allPopularBetsId = [];
      popularBets = popularBetsQuery.betEvents;
      popularBets.forEach(popularBet => {
        allPopularBetsId.push([
          popularBet.id
        ]); 
      });
      return allPopularBetsId;
      
    } catch (err) {
      console.log(err);
    }
}