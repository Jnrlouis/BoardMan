// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./helper.sol";


contract BoardMan is Ownable, helper {
    uint8 constant PRECISION = 18;
    uint24 constant VERIFICATION_PERIOD = 30 minutes;

    // EVENTS
    event BETCREATED (
        uint256 betId_, uint256 deadline_, uint8 privateOrPublic_, string name_,
        bytes32 choiceOne_, bytes32 choiceTwo_,
        address betMaster_, address opponentAddress_, uint256 amount_
    );
    event BETCREATED (
        uint256 betId_, uint256 deadline_, uint8 privateOrPublic_, string name_,
        bytes32 choiceOne_, bytes32 choiceTwo_,
        address betMaster_, uint8 numOfChoices_
    );
    event BETCREATED (
        uint256 betId_, uint256 deadline_, uint8 privateOrPublic, string name_,
        bytes32 choiceOne_, bytes32 choiceTwo_, bytes32 choiceThree_,
        address betMaster_, uint8 numOfChoices_
    );
    event BETCREATED (
        uint256 betId_, uint256 deadline_, uint8 privateOrPublic, string name_,
        bytes32 choiceOne_, bytes32 choiceTwo_, bytes32 choiceThree_, 
        bytes32 choiceFour_, address betMaster_, uint8 numOfChoices_
    );
    event BETPLACED( 
        address pundit_, uint256 betId_, 
        Choices choice_, uint256 amount_
    );
    event BETPLACED( 
        address pundit_, uint256 betId_, 
        uint256 amount_
    );
    event BETEXECUTED(
        uint256 betId_, uint8 correctChoice_, bool executed_
    );
    event PAYOUTCLAIMED(
        uint256 betId_, uint256 amount_, address pundit_
    );
    
    struct AmountMaps{
        mapping(uint8 => uint256) choiceAmountMap;
    }

    struct ChoiceOne {
        bytes32 choiceOne_;
        uint32 choiceOneNoB;
        uint256 choiceOneAmount;
        uint256 oddOne;
        uint256 finalOddOne;
    }

    struct ChoiceTwo {
        bytes32 choiceTwo_;
        uint32 choiceTwoNoB;
        uint256 choiceTwoAmount;
        uint256 oddTwo;
        uint256 finalOddTwo;
    }

    struct ChoiceThree {
        bytes32 choiceThree_;
        uint32 choiceThreeNoB;
        uint256 choiceThreeAmount;
        uint256 oddThree;
        uint256 finalOddThree;
    }

    struct ChoiceFour {
        bytes32 choiceFour_;
        uint32 choiceFourNoB;
        uint256 choiceFourAmount;
        uint256 oddFour;
        uint256 finalOddFour;
    }

    struct Totals {
        uint256 totalAmountCorrectChoice;
        uint256 totalNumberOfBetsCorrectChoice;
        uint256 totalBets;
        uint256 totalAmount;
    }

    struct INIT {
        uint256 betId;
        // deadline - the UNIX timestamp until which this bet Event is active.
        uint256 deadline;
        uint256 creationFee;
        // Bet Event Name;
        string name;
        // Bet Creator address;
        address betMaster;
        uint8 numOfChoices;
                
    }

    struct PRIVORPUB {
        uint8 privateOrPublic;
        bool active;
        bool challengeAccepted;
        address winner;
        address privateBetOpponent;
        bytes32 PP_yourChoice;
        bytes32 PP_opponentsChoice;
        bytes32 PP_correctChoice;
        uint256 PP_amount;
        
    }

    struct FINALIZE {
        uint8 correctChoice;
        bool finalOddsUpdated;
        bool executed;
        uint256 datetimeExecuted;
    }

    struct BetEvent {
        INIT init;

        ChoiceOne choiceOne;

        ChoiceTwo choiceTwo;

        ChoiceThree choiceThree;

        ChoiceFour choiceFour;

        Totals totals;

        PRIVORPUB privorpub;

        FINALIZE finalize;

        mapping(uint8 => uint256) finalOddsMaps;

        mapping(address => AmountMaps) amountMaps;
    }

    // Create a mapping of ID to BetEvent
    mapping(uint256 => BetEvent) public betEvents;
    mapping(address => uint8) public IntegrityScore;

    uint256 public numBetEvents;

    uint256 private createBetEventFee;
    uint256 private minBetFee;
    address private admin;


    // Create a payable constructor which initializes the contract
    
    // The payable allows this constructor to accept an ETH deposit when it is being deployed
    constructor(uint256 _createBetEventFee, uint256 _minBetFee) payable {
        createBetEventFee = _createBetEventFee;
        minBetFee = _minBetFee;
        admin = msg.sender;
    }

    modifier checkIntegrity() {
        require (IntegrityScore[msg.sender] < 10,
        "POOR INTEGRITY");
        _;
    }

    function integrity (address _defaulter)
    onlyOwner
    external {
        IntegrityScore[_defaulter]++;
    }
    function createPrivateBetEvent (
        string memory _name,
        uint256 _deadline,
        address _opponent,
        bytes32 _yourChoice,
        bytes32 _otherChoice,
        uint256 _amount
    )
    external payable
    validateDeadline(_deadline)
    checkIntegrity
    {
        require(msg.value >= _amount, "PAY AMOUNT");
        BetEvent storage betEvent = betEvents[numBetEvents];
        betEvent.init.betId = numBetEvents;
        // Set the bet Events deadline
        betEvent.init.deadline = _deadline;
        betEvent.init.name = _name;
        betEvent.init.betMaster = msg.sender;
        betEvent.privorpub.privateOrPublic = 1;
        betEvent.privorpub.privateBetOpponent = _opponent;
        betEvent.privorpub.PP_amount = _amount;
        betEvent.privorpub.PP_yourChoice = _yourChoice;
        betEvent.privorpub.PP_opponentsChoice = _otherChoice;
        betEvent.privorpub.active = true; 
        emit BETCREATED(
            numBetEvents,
            _deadline,
            betEvent.privorpub.privateOrPublic,
            _name,
            _yourChoice,
            _otherChoice,
            betEvent.init.betMaster,
            _opponent,
            _amount
            );
        numBetEvents++;  
    }

    modifier onlyOpponent (uint256 _betId) {
        require (
            msg.sender == betEvents[_betId].privorpub.privateBetOpponent,
            "NOT OPPONENT"
        );
        _;
    }

    modifier only_PP_Winner (uint256 _betId) {
        require (
            msg.sender == betEvents[_betId].privorpub.winner,
            "ONLY WINNER"
        );
        _;
    }

    modifier onlyActive (uint256 _betId) {
        require (betEvents[_betId].privorpub.active == true, "NOT ACTIVE");
        _;
    }

    modifier challengeNotAccepted (uint256 _betId) {
        require (betEvents[_betId].privorpub.challengeAccepted == false, "CHALLENGE ACCEPTED!");
        _;
    }

    modifier challengeAccepted (uint256 _betId) {
        require (betEvents[_betId].privorpub.challengeAccepted == true, "CHALLENGE NOT ACCEPTED!");
        _;
    }
    function recallChallenge (uint _betId) external
    onlyActive (_betId)
    activeBetEventOnly (_betId)
    onlyBetMaster (_betId)
    challengeNotAccepted (_betId)
    checkIntegrity
     {
        BetEvent storage betEvent = betEvents[_betId];
        betEvent.privorpub.active = false;
        uint256 amount = betEvent.privorpub.PP_amount;
        betEvent.privorpub.PP_amount = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    function acceptChallenge (uint _betId) external payable
    onlyOpponent (_betId)
    onlyActive (_betId)
    activeBetEventOnly (_betId)
    challengeNotAccepted (_betId)
    validateBetFee
    checkIntegrity
    {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 amount = betEvent.privorpub.PP_amount;
        require ( msg.value >= amount, "PAY PROPER AMOUNT");
        betEvent.totals.totalAmount = amount + msg.value;
        betEvent.privorpub.challengeAccepted = true;
        emit BETPLACED (
            msg.sender,
            _betId,
            amount
        );
    }

    function PPaddCorrectChoice (uint256 _betId, uint8 _correctChoice) external
    onlyActive(_betId)
    inactiveBetEvent (_betId)
    challengeAccepted (_betId)
    onlyBetMaster (_betId)
    checkIntegrity
     {
        BetEvent storage betEvent = betEvents[_betId];
        betEvent.finalize.executed = true;
        betEvent.finalize.datetimeExecuted = block.timestamp;
        if (_correctChoice == 0) {
            betEvent.privorpub.PP_correctChoice = betEvent.privorpub.PP_yourChoice;
            betEvent.privorpub.winner = betEvent.init.betMaster;
        }
        if (_correctChoice == 1) {
            betEvent.privorpub.PP_correctChoice = betEvent.privorpub.PP_opponentsChoice;
            betEvent.privorpub.winner = betEvent.privorpub.privateBetOpponent;
        }
        emit BETEXECUTED (
            _betId,
            _correctChoice,
            betEvent.finalize.executed
        );
    }

    function viewPPCorrectChoice (uint256 _betId)
    external view returns (bytes32) {
        return betEvents[_betId].privorpub.PP_correctChoice;
    }
    function winnerTakesAll (uint256 _betId) external
    onlyActive(_betId)
    only_PP_Winner (_betId)
    challengeAccepted (_betId)
    inactiveBetEventToClaim (_betId) 
    checkIntegrity
     {
        BetEvent storage betEvent = betEvents[_betId];
        require (block.timestamp > betEvent.finalize.datetimeExecuted + VERIFICATION_PERIOD,
        "WAIT TILL AFTER VERIFICATION");
        uint256 amount = betEvent.totals.totalAmount;
        amount = (amount * 95)/100;
        betEvent.totals.totalAmount = 0;
        betEvent.privorpub.active = false;
        address winner = betEvent.privorpub.winner;
        (bool success, ) = payable(winner).call{value: amount}("");
        require(success, "Failed to send Ether");
        emit PAYOUTCLAIMED (
            _betId,
            amount,
            winner
        );
    }
    function createBetEventTwo(
        string memory _name, 
        uint256 _deadline,
        bytes32 _choiceOne,
        bytes32 _choiceTwo
        )
        external payable
        validateDeadline(_deadline)
        checkIntegrity
        returns (uint256)
    {
        require(msg.value >= createBetEventFee, "PAY BET EVENT FEE");
        BetEvent storage betEvent = betEvents[numBetEvents];
        betEvent.init.betId = numBetEvents;
        // Set the bet Events deadline
        betEvent.init.deadline = _deadline;
        betEvent.init.name = _name;
        betEvent.choiceOne.choiceOne_ = _choiceOne;
        betEvent.choiceTwo.choiceTwo_ = _choiceTwo;
        betEvent.init.betMaster = msg.sender;
        betEvent.choiceOne.choiceOneNoB = 1;
        betEvent.choiceTwo.choiceTwoNoB = 1;
        uint256 _sharedAmount = msg.value/2;

        betEvent.choiceOne.choiceOneAmount = _sharedAmount;
        betEvent.choiceTwo.choiceTwoAmount = _sharedAmount;
        betEvent.init.creationFee = msg.value;

        validChoices(numBetEvents);
        emit BETCREATED(
            numBetEvents,
            _deadline,
            betEvent.privorpub.privateOrPublic,
            _name,
            _choiceOne,
            _choiceTwo,
            betEvent.init.betMaster,
            betEvent.init.numOfChoices
            );
        numBetEvents++;
        return numBetEvents - 1;
    }

    function createBetEventThree(
        string memory _name, 
        uint256 _deadline,
        bytes32 _choiceOne,
        bytes32 _choiceTwo,
        bytes32 _choiceThree
        )
        external payable
        validateDeadline(_deadline)
        checkIntegrity
        returns (uint256)
    {
        require(msg.value >= createBetEventFee, "PAY BET EVENT FEE");
        BetEvent storage betEvent = betEvents[numBetEvents];
        betEvent.init.betId = numBetEvents;
        // Set the bet Events deadline
        betEvent.init.deadline = _deadline;
        betEvent.init.name = _name;
        betEvent.choiceOne.choiceOne_ = _choiceOne;
        betEvent.choiceTwo.choiceTwo_ = _choiceTwo;
        betEvent.choiceThree.choiceThree_ = _choiceThree;
        betEvent.init.betMaster = msg.sender;
        betEvent.choiceOne.choiceOneNoB = 1;
        betEvent.choiceTwo.choiceTwoNoB = 1;
        betEvent.choiceThree.choiceThreeNoB = 1;
        uint256 _sharedAmount = msg.value/3;

        betEvent.choiceOne.choiceOneAmount = _sharedAmount;
        betEvent.choiceTwo.choiceTwoAmount = _sharedAmount;
        betEvent.choiceThree.choiceThreeAmount = _sharedAmount;
        betEvent.init.creationFee = msg.value;

        validChoices(numBetEvents);
        emit BETCREATED(
            numBetEvents,
            _deadline,
            betEvent.privorpub.privateOrPublic,
            _name,
            _choiceOne,
            _choiceTwo,
            _choiceThree,
            betEvent.init.betMaster,
            betEvent.init.numOfChoices
            );
        numBetEvents++;
        return numBetEvents - 1;
    }

    function createBetEventFour(
        string memory _name, 
        uint256 _deadline,
        bytes32 _choiceOne,
        bytes32 _choiceTwo,
        bytes32 _choiceThree,
        bytes32 _choiceFour
        )
        external payable
        validateDeadline(_deadline)
        checkIntegrity
        returns (uint256)
    {
        require(msg.value >= createBetEventFee, "PAY BET EVENT FEE");
        BetEvent storage betEvent = betEvents[numBetEvents];
        betEvent.init.betId = numBetEvents;
        // Set the bet Events deadline
        betEvent.init.deadline = _deadline;
        betEvent.init.name = _name;
        betEvent.choiceOne.choiceOne_ = _choiceOne;
        betEvent.choiceTwo.choiceTwo_ = _choiceTwo;
        betEvent.choiceThree.choiceThree_ = _choiceThree;
        betEvent.choiceFour.choiceFour_ = _choiceFour;
        betEvent.init.betMaster = msg.sender;
        betEvent.choiceOne.choiceOneNoB = 1;
        betEvent.choiceTwo.choiceTwoNoB = 1;
        betEvent.choiceThree.choiceThreeNoB = 1;
        betEvent.choiceFour.choiceFourNoB = 1;
        uint256 _sharedAmount = msg.value/4;
        
        betEvent.choiceOne.choiceOneAmount = _sharedAmount;
        betEvent.choiceTwo.choiceTwoAmount = _sharedAmount;
        betEvent.choiceThree.choiceThreeAmount = _sharedAmount;
        betEvent.choiceFour.choiceFourAmount = _sharedAmount;
        betEvent.init.creationFee = msg.value;

        validChoices(numBetEvents);
        emit BETCREATED(
            numBetEvents,
            _deadline,
            betEvent.privorpub.privateOrPublic,
            _name,
            _choiceOne,
            _choiceTwo,
            _choiceThree,
            _choiceFour,
            betEvent.init.betMaster,
            betEvent.init.numOfChoices
            );
        numBetEvents++;
        return numBetEvents - 1;
    }

    // Create a modifier which only allows a function to be
    // called if the given bet EVents deadline has not been exceeded yet
    modifier activeBetEventOnly(uint256 _betId) {
        require(
            betEvents[_betId].init.deadline > block.timestamp,
            "DEADLINE_EXCEEDED"
        );
        _;
    }

    modifier validateBetFee() {
        require(msg.value >= minBetFee, "PLACE A HIGHER BET");
        _;
    }

    enum Choices {
        choiceOne_,
        choiceTwo_,
        choiceThree_,
        choiceFour_
    }

    function validChoices(uint256 _betId) internal returns (uint8) {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 valid;
        uint8 numChoices;
        valid = uint(betEvent.choiceOne.choiceOne_);
        if (valid != 0) {
            numChoices++;
        }
        valid = uint(betEvent.choiceTwo.choiceTwo_);
        if (valid != 0) {
            numChoices++;
        }
        valid = uint(betEvent.choiceThree.choiceThree_);
        if (valid != 0) {
            numChoices++;
        }
        valid = uint(betEvent.choiceFour.choiceFour_);
        if (valid != 0) {
            numChoices++;
        }
        betEvent.init.numOfChoices = numChoices;
        return numChoices;
    }
    function checkValidChoices(uint256 _betId, uint8 option) internal view validateChoices(option) returns(uint256 valid) {
        BetEvent storage betEvent = betEvents[_betId];
        if (option == 1) {
            valid = uint(betEvent.choiceOne.choiceOne_);
            require(valid != 0, "INVALID: EMPTY CHOICE");
            return valid;
        }
        if (option == 2) {
            valid = uint(betEvent.choiceTwo.choiceTwo_);
            require(valid != 0, "INVALID: EMPTY CHOICE");
            return valid;
        }
        if (option == 3) {
            valid = uint(betEvent.choiceThree.choiceThree_);
            require(valid != 0, "INVALID: EMPTY CHOICE");
            return valid;
        }
        if (option == 4) {
            valid = uint(betEvents[_betId].choiceFour.choiceFour_);
            require(valid != 0, "INVALID: EMPTY CHOICE");
            return valid;
        }
        require(false, "INVALID CHOICE");
    }

    function placeBet(uint256 _betId, Choices choice_)
        external payable
        activeBetEventOnly(_betId)
        onlyParticipants(_betId)
        checkIntegrity
        validateBetFee returns (bool success)
    {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 amount = msg.value;

        if (choice_ == Choices.choiceOne_) {
            uint8 option = 1;
            checkValidChoices(_betId, option);
            betEvent.choiceOne.choiceOneNoB += 1;
            betEvent.choiceOne.choiceOneAmount += amount;
            betEvent.amountMaps[msg.sender].choiceAmountMap[0] += amount;
            success = true;
            emit BETPLACED (
                msg.sender,
                _betId,
                choice_,
                amount
            );
            recalcOdds(_betId);
            getTotalBets(_betId);
            getTotalAmount(_betId);
            viewFinalOdds(_betId);
            return success;
        }
        if (choice_ == Choices.choiceTwo_) {
            uint8 option = 2;
            checkValidChoices(_betId, option);
            betEvent.choiceTwo.choiceTwoNoB += 1;
            betEvent.choiceTwo.choiceTwoAmount += amount;
            betEvent.amountMaps[msg.sender].choiceAmountMap[1] += amount;
            success = true;
            emit BETPLACED (
                msg.sender,
                _betId,
                choice_,
                amount
            );
            recalcOdds(_betId);
            getTotalBets(_betId);
            getTotalAmount(_betId);
            return success;
        }
        if (choice_ == Choices.choiceThree_) {
            uint8 option = 3;
            checkValidChoices(_betId, option);
            betEvent.choiceThree.choiceThreeNoB += 1;
            betEvent.choiceThree.choiceThreeAmount += amount;
            betEvent.amountMaps[msg.sender].choiceAmountMap[2] += amount;
            success = true;
            emit BETPLACED (
                msg.sender,
                _betId,
                choice_,
                amount
            );
            recalcOdds(_betId);
            getTotalBets(_betId);
            getTotalAmount(_betId);
            return success;
        }
        if (choice_ == Choices.choiceFour_) {
            uint8 option = 4;
            checkValidChoices(_betId, option);
            betEvent.choiceFour.choiceFourNoB += 1;
            betEvent.choiceFour.choiceFourAmount += amount;
            betEvent.amountMaps[msg.sender].choiceAmountMap[3] += amount;
            success = true;
            emit BETPLACED (
                msg.sender,
                _betId,
                choice_,
                amount
            );
            recalcOdds(_betId);
            getTotalBets(_betId);
            getTotalAmount(_betId);
            return success;
        }
    }

    
    modifier inactiveBetEvent(uint256 _betId) {
        require(
            betEvents[_betId].init.deadline <= block.timestamp,
            "DEADLINE_NOT_EXCEEDED"
        );
        require(
            betEvents[_betId].finalize.executed == false,
            "BET_EVENT_ALREADY_EXECUTED"
        );
        _;
    }

    modifier inactiveBetEventToClaim(uint256 _betId) {
        require(
            betEvents[_betId].init.deadline <= block.timestamp,
            "DEADLINE_NOT_EXCEEDED"
        );
        require(
            betEvents[_betId].finalize.executed == true,
            "BET_EVENT_NOT_EXECUTED"
        );
        _;
    }

    modifier onlyBetMaster(uint256 _betId) {
        address caller = msg.sender;
        require(caller == betEvents[_betId].init.betMaster || caller == admin,
        "NOT_THE_BET_MASTER"
        );
        _;
    }

    modifier onlyParticipants(uint256 _betId) {
        address caller = msg.sender;
        require(caller != betEvents[_betId].init.betMaster,
        "BETMASTER NOT ALLOWED TO PLACE BET"
        );
        _;
    }

    function checkIfBetMaster(uint256 _betId) external view returns (bool) {
        if (msg.sender == betEvents[_betId].init.betMaster) {
            return true;
        }
        return false;
    }

    function viewBetMaster(uint256 _betId) external view returns (address) {
        return betEvents[_betId].init.betMaster;
    }

    function addAmountCorrectChoice(uint256 _betId, uint8 _correctChoice)
        internal
        validateChoices(_correctChoice)
        inactiveBetEventToClaim(_betId)
        onlyBetMaster(_betId)
        returns (bool success)
    {
        BetEvent storage betEvent = betEvents[_betId];

        if (_correctChoice == 1) {
            betEvent.totals.totalNumberOfBetsCorrectChoice = betEvent.choiceOne.choiceOneNoB;
            betEvent.totals.totalAmountCorrectChoice = betEvent.choiceOne.choiceOneAmount;
            success = true;
            return success;
        }
        if (_correctChoice == 2) {
            betEvent.totals.totalNumberOfBetsCorrectChoice = betEvent.choiceTwo.choiceTwoNoB;
            betEvent.totals.totalAmountCorrectChoice = betEvent.choiceTwo.choiceTwoAmount;
            success = true;
            return success;
        }
        if (_correctChoice == 3) {
            betEvent.totals.totalNumberOfBetsCorrectChoice = betEvent.choiceThree.choiceThreeNoB;
            betEvent.totals.totalAmountCorrectChoice = betEvent.choiceThree.choiceThreeAmount;
            success = true;
            return success;
        }
        if (_correctChoice == 4) {
            betEvent.totals.totalNumberOfBetsCorrectChoice = betEvent.choiceFour.choiceFourNoB;
            betEvent.totals.totalAmountCorrectChoice = betEvent.choiceFour.choiceFourAmount;
            success = true;
            return success;
        }
    }

    function getTotalBets (uint256 _betId) internal returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint32 totalChoiceOneBets = betEvent.choiceOne.choiceOneNoB;
        uint32 totalChoiceTwoBets = betEvent.choiceTwo.choiceTwoNoB;
        uint32 totalChoiceThreeBets = betEvent.choiceThree.choiceThreeNoB;
        uint32 totalChoiceFourBets = betEvent.choiceFour.choiceFourNoB;
        betEvent.totals.totalBets = totalChoiceOneBets + totalChoiceTwoBets + totalChoiceThreeBets + totalChoiceFourBets;
        return betEvent.totals.totalBets;
    }

    function getTotalAmount (uint256 _betId) internal returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 totalChoiceOneAmount = betEvent.choiceOne.choiceOneAmount;
        uint256 totalChoiceTwoAmount = betEvent.choiceTwo.choiceTwoAmount;
        uint256 totalChoiceThreeAmount = betEvent.choiceThree.choiceThreeAmount;
        uint256 totalChoiceFourAmount = betEvent.choiceFour.choiceFourAmount;
        betEvent.totals.totalAmount = totalChoiceOneAmount + totalChoiceTwoAmount + totalChoiceThreeAmount + totalChoiceFourAmount;
        return betEvent.totals.totalAmount;
    }

    function recalcOdds (uint256 _betId) internal returns
    (uint256, uint256, uint256, uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 _oddOne;
        uint256 _oddTwo;
        uint256 _oddThree;
        uint256 _oddFour;
        (_oddOne, _oddTwo, _oddThree, _oddFour) = execChoiceBetEvent(_betId);
        betEvent.choiceOne.oddOne = _oddOne;
        betEvent.choiceTwo.oddTwo = _oddTwo;
        betEvent.choiceThree.oddThree = _oddThree;
        betEvent.choiceFour.oddFour = _oddFour;
        return (_oddOne, _oddTwo, _oddThree, _oddFour);
    }
    function executeBetEvent(uint256 _betId, uint8 _correctChoice)
        external
        validateChoices(_correctChoice)
        inactiveBetEvent(_betId) 
        onlyBetMaster(_betId)
        checkIntegrity
        returns (bool success) 
    {
        checkValidChoices(_betId, _correctChoice);
        BetEvent storage betEvent = betEvents[_betId];
        betEvent.finalize.correctChoice = _correctChoice;
        getTotalAmount(_betId);
        getTotalBets(_betId);
        betEvent.finalize.executed = true;
        betEvent.finalize.datetimeExecuted = block.timestamp;
        addAmountCorrectChoice(_betId, _correctChoice);
        validChoices(_betId);
        recalcOdds(_betId);
        emit BETEXECUTED(
            _betId, _correctChoice, betEvent.finalize.executed
        );
        return betEvent.finalize.executed;
    }

    function getStageOneOdds(uint256 _betId) public view 
    returns (
        uint256, uint256, uint256, uint256
    ) {
        BetEvent storage betEvent = betEvents[_betId];
        uint256 _oddOne = betEvent.choiceOne.oddOne;
        uint256 _oddTwo = betEvent.choiceTwo.oddTwo;
        uint256 _oddThree = betEvent.choiceThree.oddThree;
        uint256 _oddFour = betEvent.choiceFour.oddFour;
        return (_oddOne, _oddTwo, _oddThree, _oddFour);
    }

    function getNumeratorOne(uint256 _betId) internal view returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint32 choiceOneNOB = betEvent.choiceOne.choiceOneNoB;
        uint256 choiceOneAmount = betEvent.choiceOne.choiceOneAmount;
        uint256 numerator1 = choiceOneNOB * choiceOneAmount *1e18;
        return numerator1;
    }

    function getNumeratorTwo(uint256 _betId) internal view returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint32 choiceTwoNOB = betEvent.choiceTwo.choiceTwoNoB;
        uint256 choiceTwoAmount = betEvent.choiceTwo.choiceTwoAmount;
        uint256 numerator2 = choiceTwoNOB * choiceTwoAmount *1e18;
        return numerator2;
    }

    function getNumeratorThree(uint256 _betId) internal view returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint32 choiceThreeNOB = betEvent.choiceThree.choiceThreeNoB;
        uint256 choiceThreeAmount = betEvent.choiceThree.choiceThreeAmount;
        uint256 numerator3 = choiceThreeNOB * choiceThreeAmount *1e18;
        return numerator3;
    }

    function getNumeratorFour(uint256 _betId) internal view returns (uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        uint32 choiceFourNOB = betEvent.choiceFour.choiceFourNoB;
        uint256 choiceFourAmount = betEvent.choiceFour.choiceFourAmount;
        uint256 numerator4 = choiceFourNOB * choiceFourAmount *1e18;
        return numerator4;
    }

    function getDenominator(uint256 _betId) internal returns (uint256) {
        uint256 totalNOB = getTotalBets(_betId);
        uint256 totalAmount = getTotalAmount(_betId);
        uint256 denominator = totalNOB * totalAmount;
        return denominator;
    }
    function execChoiceBetEvent(uint256 _betId) internal
    returns (uint256 odds1, uint256 odds2, uint256 odds3, uint256 odds4) {

        (odds1, odds2, odds3, odds4) = oddsFourCalculator(getNumeratorOne(_betId), 
        getNumeratorTwo(_betId), getNumeratorThree(_betId), 
        getNumeratorFour(_betId), getDenominator(_betId)
        );
        return(odds1, odds2, odds3, odds4);
    }

    function viewCorrectChoice(uint256 _betId) 
    public view 
    inactiveBetEventToClaim(_betId) 
    returns (uint8 correctChoice) {
        return betEvents[_betId].finalize.correctChoice;
    }

    function finalOdds(uint256 _betId, uint256 odds1, uint256 odds2,
    uint256 odds3, uint256 odds4) public 
    checkIntegrity
    activeBetEventOnly(_betId)
    returns (uint256, uint256, uint256, uint256) {
        BetEvent storage betEvent = betEvents[_betId];
        betEvent.choiceOne.finalOddOne = odds1;
        betEvent.choiceTwo.finalOddTwo = odds2;
        betEvent.choiceThree.finalOddThree = odds3;
        betEvent.choiceFour.finalOddFour = odds4;
        betEvent.finalOddsMaps[1] = odds1;
        betEvent.finalOddsMaps[2] = odds2;
        betEvent.finalOddsMaps[3] = odds3;
        betEvent.finalOddsMaps[4] = odds4;
        betEvent.finalize.finalOddsUpdated = true;
        return (odds1, odds2, odds3, odds4);
    }

    function viewFinalOdds(uint256 _betId) public view
    returns (uint256 finalOdd1, uint256 finalOdd2, uint256 finalOdd3, uint256 finalOdd4) {
        finalOdd1 = betEvents[_betId].choiceOne.finalOddOne;
        finalOdd2 = betEvents[_betId].choiceTwo.finalOddTwo;
        finalOdd3 = betEvents[_betId].choiceThree.finalOddThree;
        finalOdd4 = betEvents[_betId].choiceFour.finalOddFour;
        return (finalOdd1, finalOdd2, finalOdd3, finalOdd4);
    }

    modifier onlyWinners (uint256 _betId) {
        address pundit = msg.sender;
        BetEvent storage betEvent = betEvents[_betId];
        uint8 correctChoice__ = betEvent.finalize.correctChoice;
        uint256 amountBet = betEvent.amountMaps[pundit].choiceAmountMap[correctChoice__];
        require(amountBet > 0, "Sorry, WINNERS ONLY");
        _;
    }

    modifier onlyWhenFinalOddsUpdated (uint256 _betId) {
        BetEvent storage betEvent = betEvents[_betId];
        bool finalOddsUpdated = betEvent.finalize.finalOddsUpdated;
        require(finalOddsUpdated == true, "Final Odds Not Updated");
        _;
    }
    function claimPayout(uint256 _betId) external
    inactiveBetEventToClaim(_betId) 
    onlyWinners(_betId)
    onlyWhenFinalOddsUpdated(_betId)
    checkIntegrity
    returns (bool success) {
        BetEvent storage betEvent = betEvents[_betId];
        uint8 correctChoice__ = betEvent.finalize.correctChoice;
        uint256 amountBet = betEvent.amountMaps[msg.sender].choiceAmountMap[correctChoice__];
        uint256 payout = (amountBet * betEvent.finalOddsMaps[correctChoice__])/(10 ** PRECISION);
        betEvent.amountMaps[msg.sender].choiceAmountMap[correctChoice__] = 0;
        (success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Failed to send Ether");
        emit PAYOUTCLAIMED (
            _betId, payout, msg.sender
        );

        return success;
    }

    function claimBetMaster(uint256 _betId) external payable 
    onlyBetMaster(_betId)
    checkIntegrity
    inactiveBetEventToClaim(_betId) returns (bool success){
        BetEvent storage betEvent = betEvents[_betId];
        uint8 correctChoice__ = betEvent.finalize.correctChoice;
        uint256 _amount = betEvent.totals.totalAmountCorrectChoice;
        _amount = (_amount * betEvent.finalOddsMaps[correctChoice__])/(10 ** PRECISION);
        uint256 _totalAmount = betEvent.totals.totalAmount;
        address betMasterAddress = betEvent.init.betMaster;
        success = payCut(_betId, _amount, _totalAmount, betMasterAddress);
        return success;
    }

    function viewBetEventFee() public view returns (uint256) {
        return createBetEventFee;
    }

    function viewMinBetFee() public view returns (uint256) {
        return minBetFee;
    }
    /// @dev withdrawEther allows the contract owner (deployer) to withdraw the ETH from the contract
    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // The following two functions allow the contract to accept ETH deposits
    // directly from a wallet without calling a function
    receive() external payable {}

    fallback() external payable {}

}



