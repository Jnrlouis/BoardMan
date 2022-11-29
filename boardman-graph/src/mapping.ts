import { BigInt } from "@graphprotocol/graph-ts"
import {
  BoardMan,
  BETCREATED,
  BETCREATED1,
  BETCREATED2,
  BETCREATED3,
  BETEXECUTED,
  BETMASTERPAYOUTCLAIMED,
  BETPLACED,
  BETPLACED1,
  OwnershipTransferred,
  PAYOUTCLAIMED
} from "../generated/BoardMan/BoardMan"
import { BetEvent } from "../generated/schema"

export function handlePRIVATEBETCREATED(event: BETCREATED): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BetEvent(event.params.betId_.toString())
  }

  // Entity fields can be set based on event parameters
  entity.privateOrPublic = event.params.privateOrPublic_;
  entity.name = event.params.name_;
  entity.deadline = event.params.deadline_;
  entity.choiceOne = event.params.choiceOne_;
  entity.choiceTwo = event.params.choiceTwo_;
  entity.betMaster = event.params.betMaster_;
  entity.pundit = [event.params.opponentAddress_];
  entity.amount = event.params.amount_;

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleBETCREATED1(event: BETCREATED1): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BetEvent(event.params.betId_.toString())
  }

  // Entity fields can be set based on event parameters
  entity.name = event.params.name_;
  entity.privateOrPublic = event.params.privateOrPublic_;
  entity.deadline = event.params.deadline_;
  entity.choiceOne = event.params.choiceOne_;
  entity.choiceTwo = event.params.choiceTwo_;
  entity.betMaster = event.params.betMaster_;
  let newPundit = entity.pundit;
  newPundit.push(event.params.betMaster_);
  entity.pundit = newPundit;

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleBETCREATED2(event: BETCREATED2): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BetEvent(event.params.betId_.toString())
  }

  // Entity fields can be set based on event parameters
  entity.name = event.params.name_;
  entity.privateOrPublic = event.params.privateOrPublic;
  entity.deadline = event.params.deadline_;
  entity.choiceOne = event.params.choiceOne_;
  entity.choiceTwo = event.params.choiceTwo_;
  entity.choiceThree = event.params.choiceThree_;
  entity.betMaster = event.params.betMaster_;
  let newPundit = entity.pundit;
  newPundit.push(event.params.betMaster_);
  entity.pundit = newPundit;

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleBETCREATED3(event: BETCREATED3): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BetEvent(event.params.betId_.toString())
  }

  // Entity fields can be set based on event parameters
  entity.name = event.params.name_;
  entity.privateOrPublic = event.params.privateOrPublic;
  entity.deadline = event.params.deadline_;
  entity.choiceOne = event.params.choiceOne_;
  entity.choiceTwo = event.params.choiceTwo_;
  entity.choiceThree = event.params.choiceThree_;
  entity.choiceFour = event.params.choiceFour_;
  entity.betMaster = event.params.betMaster_;
  let newPundit = entity.pundit;
  newPundit.push(event.params.betMaster_);
  entity.pundit = newPundit;

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleBETEXECUTED(event: BETEXECUTED): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    return;
  }

  entity.correctChoice = event.params.correctChoice_;
  entity.executed = event.params.executed_;

}

export function handleBETMASTERPAYOUTCLAIMED(
  event: BETMASTERPAYOUTCLAIMED
): void {}

export function handleBETPLACED(event: BETPLACED): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    return;
  }

  let newPundit = entity.pundit;
  newPundit.push(event.params.pundit_);
  entity.pundit = newPundit;
  if (!entity.amount) {
    entity.amount = event.params.amount_;
  } else {
    let BigAmount = entity.amount;
    entity.amount = BigAmount + event.params.amount_;
  }

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleBETPLACED1(event: BETPLACED1): void {
  let entity = BetEvent.load(event.params.betId_.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    return;
  }
  let newPundit = entity.pundit;
  newPundit.push(event.params.pundit_);
  entity.pundit = newPundit;

  if (!entity.amount) {
    entity.amount = event.params.amount_;
  } else {
    let BigAmount = entity.amount;
    entity.amount = BigAmount + event.params.amount_;
  }

  const ONE = BigInt.fromI32(1);

  if (!entity.totalNOB) {
    
    entity.totalNOB = ONE;
  } else {
    let total = entity.totalNOB;
    entity.totalNOB = total + ONE;
    
  }
  

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePAYOUTCLAIMED(event: PAYOUTCLAIMED): void {

}
