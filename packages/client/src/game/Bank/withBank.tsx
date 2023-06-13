import { Modal } from 'antd';
import {
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  leavePlayer,
  selectCardsData,
  selectPlayers,
  selectRandomCards,
  transferMoneyBetweenPlayers,
} from 'app/slices/gameSlice';
import { randomCards } from 'data/cards';
import { randomInt } from 'game/helpers/helpers';
import { modalInfo, modalRandomCard, modalTaxCard, useModal } from 'game/helpers/modal';
import { useAppSelector } from 'hooks';

import { useAppDispatch } from 'hooks/redux';
import type { ComponentType } from 'react';
import { CardData, RANDOM } from 'types/cards';

import type {
  MoneyTransfer,
  BankTransaction,
  BuyPropertyCardPayload,
  PropertyCardId,
} from 'types/game';

export type WithBankProps = {
  randomCardAction: (playerId: number, card: CardData, next: Function) => void;
  checkSolvency: (playerId: number) => boolean;
  taxCardAction: (playerId: number, card: CardData, next: Function) => void;
  buyPropertyCard: (contract: BuyPropertyCardPayload) => void;
  claimCircleBonus: (transaction: BankTransaction) => void;
  getReward: (transfer: MoneyTransfer) => void;
  payPenalty: (transaction: BankTransaction) => void;
  payRent: (transfer: MoneyTransfer) => void;
  sellPropertyCard: (propertyCardId: PropertyCardId) => void;
};

export const withBank =
  <T extends WithBankProps>(WrappedComponent: ComponentType<T>) =>
  (props: Omit<T, keyof WithBankProps>) => {
    const modal = Modal;

    const cardsData = useAppSelector(selectRandomCards);
    const players = useAppSelector(selectPlayers);

    const dispatch = useAppDispatch();
    const buyPropertyCard = () => {
      /* TODO логика покупки */
    };
    const randomCardAction = (playerId: number, { title }: CardData, next: Function) => {
      const { credit, debt, desc } = randomCards[randomInt(randomCards.length - 1)];
      const closeModal = () => {
        if (credit) getReward({ playerId, amount: credit });
        if (debt) payPenalty({ playerId, amount: debt });
        next();
      };

      modalRandomCard({ title, credit, debt, desc, next: closeModal });
    };

    const taxCardAction = (
      playerId: number,
      { title, price: amount = 0 }: CardData,
      next: Function,
    ) => {
      const closeModal = () => {
        payPenalty({ playerId, amount });
        next();
      };
      modalTaxCard({ title, amount, next: closeModal });
    };

    const getReward = ({ playerId, amount }: BankTransaction) => {
      dispatch(addMoneyForPlayer({ playerId, amount }));
    };

    const payPenalty = async ({ playerId, amount }: BankTransaction) => {
      if (!checkSolvency(playerId, amount)) {
        alert('Угроза БАНКРОТСТВА!');
        dispatch(leavePlayer(playerId));
      }
      dispatch(deductMoneyFromPlayer({ playerId, amount }));
    };

    const checkSolvency = (playerId: number, amount: number = 0): boolean =>
      players[playerId].balance - amount >= 0 ? true : false;

    const sellPropertyCard = () => {
      /* TODO логика продажи */
    };

    const payRent = ({ senderId, recipientId, amount }: MoneyTransfer) => {
      dispatch(transferMoneyBetweenPlayers({ senderId, recipientId, amount }));
    };

    const claimCircleBonus = ({ playerId, amount }: BankTransaction) => {
      dispatch(addMoneyForPlayer({ playerId, amount }));
    };

    const bankOperations = {
      payRent,
      claimCircleBonus,
      getReward,
      payPenalty,
      buyPropertyCard,
      checkSolvency,
      randomCardAction,
      taxCardAction,
      sellPropertyCard,
    };

    return <WrappedComponent {...(props as T)} {...bankOperations} />;
  };
