import {
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  transferMoneyBetweenPlayers,
} from 'app/slices/gameSlice';
import { useAppDispatch } from 'hooks/redux';
import type { ComponentType, FC } from 'react';

import type { MoneyTransfer, BankTransaction } from 'types/game';

type WithBankProps = {
  buyProperty: () => void;
  claimCircleBonus: (transaction: BankTransaction) => void;
  getReward: (transfer: MoneyTransfer) => void;
  payPenalty: (transaction: BankTransaction) => void;
  payRent: (transfer: MoneyTransfer) => void;
  sellProperty: () => void;
};

export const withBank =
  <T extends object>(WrappedComponent: ComponentType<T>): FC<T & WithBankProps> =>
  (props: T & WithBankProps) => {
    const dispatch = useAppDispatch();

    const buyProperty = () => {
      /* TODO document why this arrow function is empty */
    };

    const sellProperty = () => {
      /* TODO document why this arrow function is empty */
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
      buyProperty,
      sellProperty,
    };

    return <WrappedComponent {...props} {...bankOperations} />;
  };
