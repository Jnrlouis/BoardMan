import { subgraphQuery } from "./utils.js";

function FETCH_NAME_BETS_ID(name) {
    return `query {
        betEvents(
            where: {name_contains: "${name}"}
            orderBy: id
            orderDirection: desc
        ) {
            id
        }
    }`;
};

export const getBetNameBets = async (inputName) => {
    try {
    const BetNameBetsQuery = await subgraphQuery(FETCH_NAME_BETS_ID(inputName));
    let BetNameBets = [];
    let allBetNameBetsId = [];
    BetNameBets = BetNameBetsQuery.betEvents;
    BetNameBets.forEach(BetNameBet => {
        allBetNameBetsId.push([
        BetNameBet.id
        ]); 
    });
    return allBetNameBetsId;     
    } catch (err) {
    console.log(err);
    }
}