# BoardMan

## Tech Stack

- **Solidity** - *for the Smart Contract*
- **Hardhat** - *for the Smart Contract development and testing*
- **thirdweb** - *thirdweb release used for deployment*
- **RainbowKitUI** - *for Connecting the Wallet*
- **wagmi** - *wagmi hooks used for integrating the Smart Contract to the frontend*
- **ethersJs** - *ethers used for integrating the Smart contract and the frontend*
- **React** - *React used for the frontend*
- **theGraph** - *theGraph used for querying*

## Use Case

You're in a heated argument on twitter, you're so sure of your opinion, matter of fact, you're so sure that you're willing to put your money where your mouth is... But this is a random internet stranger. Who do you trust to act as the middleman and hold your money until the bet is settled. Random internet stranger suggests Mr. X, he said he trusts him. But do you? Are they trying to pull a fast one on you? It's not that you have doubts concerning your opinion, you don't just trust random internet strangers. Thankfully, you don't have to. 
Welcome to BoardMan.

## BoardMan

BoardMan is a decentralized customizable betting app where users can create their own events to bet on. Unlike regular betting apps, with BoardMan, users can bet on any and everything! BoardMan utilizes the transparency of the blockchain to act as a middleman for your bets. 

### CREATING BETS
There are two types of Bet Events in Boardman - Private & Public Bet Events.

**Private Bets:**
A maximum of two(2) people are allowed to participate. Whenever you want to bet against a particular person, whether it is a friend or random internet stranger, the Private Bet is your best bet. All you need is their wallet address... and their opinion.
The Private Bet uses a winner-takes-all model (5% service fee included).

The Bet Master creates the Event with the:

- Bet Event Name
- Bet Amount in Matic [Note that the minimum allowed amount is 0.5 Matic]
- Opponent's Wallet Address
- Bet Deadline
- First Outcome [Note: The First Outcome should be the choice of the Bet master]
- Second Outcome [Note: The Second Outcome should be the choice of the Opponent]

After Creating the Bet Event, the opponent is expected to accept the challenge. The Challenge can be recalled at any time before the opponent accepts the challenge and the bet amount would be returned. Note that you cannot recall a challenge once the opponent has accepted it.
After the set deadline, the Bet Master is expected to update the Bet Event with the correct outcome.
When the Bet Event has been updated by the Bet Master, the total Bet Amount would be locked till after a verification period, during the verification period, the opponent can pay a "Check fee" to verify the updated correct outcome.
In the case of any malicious actor, your INTEGRITY POINTS would be deducted and you'd be unable to create or place bets on BoardMan.
After the verification period, the Winner of the Bet Event would be able to claim the prize.

**Public Bets:**
Unlike the Private Bet, there is NO maximum allowed number of participants in the Public Bet. This uses an Odds system which is updated and adjusted on-chain.

The Bet Master creates the Event with the:

- Bet Event Name
- Bet Amount [Note that the Bet Creation Fee for Public Bet is fixed at 5 Matic]
- Bet Deadline
- First Outcome
- Second Outcome
- *More outcomes can be added, the minimum allowed outcome is two(2) while the maximum is four(4).*

After creating the Bet Event, the Bet ID can be shared and other users invited to place bets on their desired outcomes. The Bet Master is not allowed to place bets on the Bet Event.
When the deadline has been exceeded, the Bet Master is expected to update the Bet Event with the correct outcome. Malicious actors would have their INTEGRITY POINTS deducted and they wouldn't be able to Create or Place Bets on BoardMan.
After the deadline, All Winners can claim their winnings which would be their Stake multiplied by the Final Odd.
The Bet Master would be able to claim the remaining balance after the service fee.

### PLACING BETS
Users can view all bets and place bets in any Public Bet provided they are NOT the Bet Master AND any Private Bet provided they are the correct opponent.
Note that the minimum allowable amount for staking is 0.5 MATIC.

**MAY THE ODDS BE IN YOUR FAVOUR!**
