// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract helper {
    // Helper Contract
    event BETMASTERPAYOUTCLAIMED(
        uint256 betId_, uint256 profit_, address betMaster_
    );

    modifier validateChoices (uint8 _choice) {
        require(_choice >= 1 && _choice <= 4, "INVALID CHOICE NUMBER");
        _;        
    }

    modifier validateDeadline(uint256 _deadline) {
        require(_deadline > (block.timestamp + 5 minutes), "INVALID DEADLINE: TOO SHORT");
        require(_deadline < (block.timestamp + 365 days), "INVALID DEADLINE: TOO LONG");
        _;
    }
    function oddsFourCalculator (
        uint256 numerator1,
        uint256 numerator2,
        uint256 numerator3,
        uint256 numerator4,
        uint256 denominator
    ) internal pure returns(uint256 odds1, uint256 odds2, uint256 odds3, uint256 odds4) {
        
        odds1 = numerator1/denominator;
        odds2 = numerator2/denominator;
        odds3 = numerator3/denominator;
        odds4 = numerator4/denominator;
        return (odds1, odds2, odds3, odds4);
    }

    function payCut(uint256 _betId, uint256 _payoutAmount, uint256 _totalAmount, address _betMaster) internal 
    returns (bool success) {
        uint256 profit = _totalAmount - _payoutAmount;
        uint256 percentCut = (profit * 5)/100;
        if (percentCut > 0) {
            profit = profit - percentCut;
            (success, ) = _betMaster.call{value: profit}("");
            require (success, "BET MASTER PAID");
            emit BETMASTERPAYOUTCLAIMED (
                _betId, profit, _betMaster
            );
            return success;
        } else {
            require(percentCut > 0, "NOTHING TO WITHDRAW");
        }
    }
}