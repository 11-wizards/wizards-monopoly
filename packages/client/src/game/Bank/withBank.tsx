import {
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  transferMoneyBetweenPlayers,
} from 'app/slices/gameSlice';
import { useAppDispatch } from 'hooks/redux';
import type { ComponentType } from 'react';

import type {
  MoneyTransfer,
  BankTransaction,
  BuyPropertyCardPayload,
  PropertyCardId,
} from 'types/game';

type WithBankProps = {
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
    const dispatch = useAppDispatch();
    const buyPropertyCard = () => {
      /* TODO логика покупки */
    };

    const sellPropertyCard = () => {
      /* TODO логика продажи */
    };

    const payRent = ({ senderId, recipientId, amount }: MoneyTransfer) => {
      dispatch(transferMoneyBetweenPlayers({ senderId, recipientId, amount }));
    };

    const claimCircleBonus = ({ playerId, amount }: BankTransaction) => {
      dispatch(addMoneyForPlayer({ playerId, amount }));
    };

    const getReward = ({ playerId, amount }: BankTransaction) => {
      dispatch(addMoneyForPlayer({ playerId, amount }));
    };

    const payPenalty = ({ playerId, amount }: BankTransaction) => {
      dispatch(deductMoneyFromPlayer({ playerId, amount }));
    };

    const bankOperations = {
      payRent,
      claimCircleBonus,
      getReward,
      payPenalty,
      buyPropertyCard,
      sellPropertyCard,
    };

    return <WrappedComponent {...(props as T)} {...bankOperations} />;
  };
