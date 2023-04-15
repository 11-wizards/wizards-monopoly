import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  gameRulesTitle: {
    id: 'rules.title',
    defaultMessage: 'Game rules',
  },
  gameRulesCloseButton: {
    id: 'rules.close.button',
    defaultMessage: 'Close',
  },
  gameRulesGoalTitle: {
    id: 'rules.goal.title',
    defaultMessage: 'Goal',
  },
  gameRulesGoalDescription: {
    id: 'rules.goal.desc',
    defaultMessage: 'Win, remaining the only player not bankrupt.',
  },
  gameRulesGameTitle: {
    id: 'rules.game.title',
    defaultMessage: 'Game',
  },
  gameRulesGameDescription1: {
    id: 'rules.game.desc1',
    defaultMessage:
      'The players take turns throwing dice. The player who threw the highest number starts.',
  },
  gameRulesGameDescription2: {
    id: 'rules.game.desc2',
    defaultMessage:
      "The player rolls the dice and moves the chip along the arrow to the number of fields that fell on the dice. There can be three players' chips on the same field at the same time. Depending on which field the player has stopped on, he performs the following actions:",
  },
  gameRulesGameDescription2Item1: {
    id: 'rules.game.desc2.item1',
    defaultMessage: 'Buys Property (if it is not occupied)',
  },
  gameRulesGameDescription2Item2: {
    id: 'rules.game.desc2.item2',
    defaultMessage:
      'Asks the banker to put the Property up for auction (if he does not want to buy it)',
  },
  gameRulesGameDescription2Item3: {
    id: 'rules.game.desc2.item3',
    defaultMessage: 'Pays rent (if the property belongs to another player)',
  },
  gameRulesGameDescription2Item4: {
    id: 'rules.game.desc2.item4',
    defaultMessage: 'Pays taxes',
  },
  gameRulesGameDescription2Item5: {
    id: 'rules.game.desc2.item5',
    defaultMessage: 'Takes a Chance card (or Public Treasury)',
  },
  gameRulesGameDescription2Item6: {
    id: 'rules.game.desc2.item6',
    defaultMessage: 'Goes to jail',
  },
  gameRulesGameDescription3: {
    id: 'rules.game.desc3',
    defaultMessage:
      'When the player collects all the cards of the same color, he can build Houses and Hotels on his plots.',
  },
  gameRulesGameDescription4: {
    id: 'rules.game.desc4',
    defaultMessage:
      'If the money runs out, the player can mortgage or sell the Property to pay off creditors. If a player cannot raise enough money to pay rent, tax, or pay a bill, he is declared bankrupt and quits the game',
  },
  gameRulesGameDescription5: {
    id: 'rules.game.desc5',
    defaultMessage:
      'Players are not allowed to lend money to each other. But you can accept any Property instead of money as payment.',
  },
  gameRulesGameDescription6: {
    id: 'rules.game.desc6',
    defaultMessage:
      'If a player throws a double, he walks as usual, and then rolls the dice again. If a player throws doubles three times in a row in one turn, he goes to jail',
  },
  gameRulesGameDescription7: {
    id: 'rules.game.desc7',
    defaultMessage: 'The game continues until there is only One player left. He becomes the winner',
  },
  gameRulesPurchaseTitle: {
    id: 'rules.purchase.title',
    defaultMessage: 'Purchase of property',
  },
  gameRulesPurchaseDescription1: {
    id: 'rules.purchase.disc1',
    defaultMessage: 'There are three types of Property in the game:',
  },
  gameRulesPurchaseDescription1Item1: {
    id: 'rules.purchase.disc1.item1',
    defaultMessage: 'Locations',
  },
  gameRulesPurchaseDescription1Item2: {
    id: 'rules.purchase.disc1.item2',
    defaultMessage: 'Transport',
  },
  gameRulesPurchaseDescription1Item3: {
    id: 'rules.purchase.disc1.item3',
    defaultMessage: 'Communications',
  },
  gameRulesPurchaseDescription2: {
    id: 'rules.purchase.disc2',
    defaultMessage:
      "When a player stops at a free Property, he can buy it. In this case, the player pays the banker the amount indicated on the field. In this case, the player receives the Owner's card, which he must put face up in front of him. If the player refuses to buy the Property, it is put up for auction",
  },
  gameRulesPurchaseDescription3: {
    id: 'rules.purchase.disc3',
    defaultMessage:
      'If a player owns a Property, he receives rent from other players who stay on it. When a player collects all the Property of the same color, i.e. becomes a monopolist, he can build Houses and Hotels on plots of this color and collect increased rent!',
  },
});
