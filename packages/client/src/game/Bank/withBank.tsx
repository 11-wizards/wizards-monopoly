import {
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  transferMoneyBetweenPlayers,
} from 'app/slices/gameSlice';
import { useAppDispatch } from 'hooks/redux';
import type { ComponentType, FC } from 'react';

import type { MoneyTransfer, BankTransaction } from 'types/game';

type WithBankProps = {
  claimCircleBonus: (transaction: BankTransaction) => void;
  transferTo: (transfer: MoneyTransfer) => void;
};

export const withBank =
  <T extends object>(WrappedComponent: ComponentType<T & WithBankProps>): FC<T & WithBankProps> =>
  ({ ...props }) => {
    const dispatch = useAppDispatch();

    // const buyProperty = () => {};

    // const sellProperty = () => {};

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
    };

    return <WrappedComponent {...props} {...bankOperations} />;
  };
